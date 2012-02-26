class Api::FolderController < ApplicationController
  verify_nothing :session => :member
  #verify_nothing :method => :post
  verify_json :params => :name, :only => :create
  verify_json :params => [:name, :folder_id], :only => :update
  verify_json :params => :folder_id, :only => :delete
  skip_before_filter :verify_authenticity_token
  
  ERR_ALREADY_EXISTS = 10

  def create
    if (name = params[:name]).blank?
      return render_json_status(false)
    end
    Folder.transaction do
      if member.folders.find_by_name(name)
        return render_json_status(false, ERR_ALREADY_EXISTS)
      end
      member.folders.create(:name => name)
    end
    render_json_status(true)
  end

  def delete
    unless folder = get_folder
      return render_json_status(false)
    end
    # Subscription.update_all "folder_id = 0", ["folder_id = ?", folder_id]
    folder.destroy
    render_json_status(true)
  end

  def update
    unless folder = get_folder
      return render_json_status(false)
    end
    if (name = params[:name]).blank?
      return render_json_status(false)
    end
    folder.update_attribute(:name, name)
    render_json_status(true)
  end

protected
  def get_folder
    if (folder_id = params[:folder_id].to_i) > 0
      return member.folders.find_by_id(folder_id)
    end
    return nil
  end
end
