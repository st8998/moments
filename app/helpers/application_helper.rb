module ApplicationHelper

  def icon(name)
    content_tag 'svg', class: "icon icon-#{name}", viewBox: "0 0 32 32" do
      content_tag 'use', nil, 'xlink:href' => "#icon-#{name}"
    end
  end

  def icon_def(name, path)
    content_tag 'svg', display: 'none', version: '1.1', xmlns: 'http://www.w3.org/2000/svg',
        'xmlns:xlink' => 'http://www.w3.org/1999/xlink', width: '32', height: '32', viewBox: '0 0 32 32' do
      content_tag 'defs' do
        content_tag 'g', id: "icon-#{name}" do
          content_tag 'path', nil, class: 'path1', d: path
        end
      end
    end
  end

  def angular_template(id)
    content_tag('script', type: 'text/ng-template', id: id) do
      render(template: id.sub(/^\/template/, '/../assets/javascripts'))
    end
  end

end
