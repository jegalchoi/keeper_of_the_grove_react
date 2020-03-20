class PlantsController < ApplicationController
  def index
    @plants = Plant.all.order(created_at: :desc)
    if @plants
      render json: {
        plants: @plants
      }
    else
      render json: {
        status: 500,
        errors: ['Could not locate any plants']
      }
    end
  end

  def show
    @plant = selected_plant
    if @plant
      render json: {
        plant: @plant
      }
    else
      render json: {
        status: 500,
        errors: ['Could not locate plant']
      }
    end
  end

  def create
    @plant = Plant.new(plant_params)
    if @plant.save
      render json: {
        status: :created,
        plant: @plant
      }
    else
      render json: {
        status: 500,
        errors: @plant.errors.full_messages
      }
    end
  end

  def update
    @plant = selected_plant
    if @plant && @plant.update_attributes(plant_params)
      render json: {
        status: :updated,
        plant: @plant
      }
    elsif !@plant
      render json: {
        status: 400,
        errors: ['Could not locate plant']
      }
    else
      render json: {
        status: 401,
        errors: @plant.errors.full_messages
      }
    end
  end

  def destroy
    @plant = selected_plant
    if @plant
      @plant.destroy
      render json: {
        status: :destroyed
      }
    else
      render json: {
        status: 500,
        errors: ['Could not locate plant']
      }
    end
  end

  private

  def plant_params
    params.require(:plant).permit(:name, :notes, :water, :private, :image, :user_id)
  end

  def selected_plant
    Plant.find(params[:id])
  end
  
end