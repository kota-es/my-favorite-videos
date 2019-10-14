class CreateVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :videos do |t|
      t.string :word,     null: false, unique: true, index: true
      t.string :title
      t.string :url,      null: false
      t.string :note
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
