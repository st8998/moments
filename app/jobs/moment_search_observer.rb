class MomentSearchObserver < ActiveRecord::Observer
  class Job
    include SuckerPunch::Job

    def update_index(client, moment)
      # do nothing for now
      #client.index(
      #    index: 'moments',
      #    type: 'moment',
      #    id: moment.id,
      #    body: Rabl.render(moment, 'api/moment', view_path: 'app/views', format: :json))
    end
  end

  ASYNC = true

  observe :moment

  def after_save(moment)
    job.update_index(client, moment)
  end

  private

  def job
    if ASYNC
      Job.new.async
    else
      Job.new
    end
  end

  def client
    @client ||= Elasticsearch::Client.new(log: true)
  end
end