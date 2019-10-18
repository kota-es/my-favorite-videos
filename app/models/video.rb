class Video < ApplicationRecord
  validates :word, presence: true, uniqueness: true
  validates :url, presence: true

  belongs_to :user

  scope :recent, -> { order("created_at DESC") }
  
end