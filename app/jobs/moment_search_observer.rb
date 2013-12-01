class MomentSearchObserver < ActiveRecord::Observer
  include SuckerPunch::Job

  observe :moment

  def after_save(moment)
    update_index(moment)
  end

  private

  def update_index(moment)
    client.index(index: 'moments', type: 'moment', id: moment.id, body: moment.attributes)
  end

  def client
    @client ||= Elasticsearch::Client.new(log: true)
  end
end