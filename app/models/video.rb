class Video < ApplicationRecord
  belongs_to :user

  validates :word, presence: true, uniqueness: true
  validates :url, presence: true
end