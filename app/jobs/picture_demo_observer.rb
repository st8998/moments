class PictureDemoObserver < ActiveRecord::Observer
  class Job
    include SuckerPunch::Job

    def delete_demo_picture(picture)
      after(10.minutes) do
        picture.destroy if Picture.exists?(picture.id)
      end
    end
  end

  observe :picture

  def after_save(picture)
    Job.new.async.delete_demo_picture(picture) if picture.account.demo?
  end
end