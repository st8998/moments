class MomentsController < ApplicationController
  expose :moments
  expose :moment, attributes: :moment_params

  PER_PAGE = 5

  def index
    if request.format.json?
      # render json: moments.root.includes(:photos, :author, sub_moments: [:photos, :author]).order(:date.desc)
      @moments = moments.root.select(:id, :updated_at).order(:date.desc, :id.desc)

      if params[:from_date].present?
        date = DateTime.parse(params[:from_date])
        id = params[:from_id]
        @moments = @moments.where('(moments.date, moments.id) < (?, ?)', date, id)
      end

      @moments = @moments.limit(PER_PAGE)

      if @moments.empty? || stale?(
          etag: @moments.reduce('') {|memo, m| memo+m.id.to_s+'|'},
          last_modified: @moments.max {|a,b| a.updated_at <=> b.updated_at }.updated_at
      )
        render json: @moments
      end
    end
  end

  def create
    if moment.parent_id
      authorize!(:create_sub_moment, moment.parent)
    else
      authorize!(:create, Moment)
    end
    moment.author = current_user
    moment.save

    render json: moment
  end

  def update
    authorize!(:update, moment)
    moment.touch
    moment.save

    render json: moment
  end

  def destroy
    authorize!(:delete, moment)
    moment.destroy
    render nothing: true
  end

  private

  PERMITTED_ATTRIBUTES = [
      :date,
      :description,
      :parent_id,
      {photos: [:id, :position, :description]},
      {place: [:id, :name, :lat, :lng, :country, :administrative_area_level_2,
          :administrative_area_level_1, :locality, :route, :street_number, :postal_code]}
  ]

  def moment_params
    params.require(:moment).permit(*PERMITTED_ATTRIBUTES)
  end
end
