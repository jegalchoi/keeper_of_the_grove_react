class Api::V1::ImagesController < ApplicationController
  before_action :find_image_by_params_id, only: [:show, :destroy]
  rescue_from Exception, with: :exeception_handler

  def show
    if @image
      render json: {
        image: @image
      }
    else
      render json: {
        status: 500,
        errors: ['Could not locate image']
      }
    end
  end

  def create
    uploaded_image = Cloudinary::Uploader.upload(params[:file])
    image = { 'url': uploaded_image['secure_url'], 'public_id': uploaded_image['public_id'] }
    
    @image = Image.new(image)
    if @image.save
      render json: {
        status: :created,
        image: @image
      }
    else
      render json: {
        status: 500,
        errors: @image.errors.full_messages
      }
    end
  end

  def destroy
    if @image
      if Cloudinary::Uploader.destroy(@image.public_id)['result'] === 'ok'
        @image.destroy
        render json: {
          status: :destroyed
        }
      else
        render json: {
          status: 500,
          errors: ['Could not delete plant']
        }
      end
    else
      render json: {
        status: 500,
        errors: ['Could not locate plant']
      }
    end
  end

  private

  def find_image_by_params_id
    @image = Image.find(params[:id])
  end

  def exeception_handler(exception)
    case exception
    when ActiveRecord::RecordNotFound
      render json: {
        status: 400,
        errors: ['Could not locate image']
      }
    end
  end

end
