class Api::FolderController < ApplicationController
  before_action :login_required_api
  # we need not check folder_id, because it checked by each method
  params_required :name, only: [ :create, :update ]
  skip_before_action :verify_authenticity_token

  ERR_ALREADY_EXISTS = 10

  def create
    name = params[:name]
    Folder.transaction do
      if @member.folders.find_by(name: name)
        return render_json_status(false, ERR_ALREADY_EXISTS)
      end
      @member.folders.create(name: name)
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
    name = params[:name]
    folder.update_attribute(:name, name)
    render_json_status(true)
  end

  protected

  def get_folder
    if (folder_id = params[:folder_id].to_i) > 0
      return @member.folders.find_by(id: folder_id)
    end
    return nil
  end
end
