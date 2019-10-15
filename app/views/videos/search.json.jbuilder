json.array! @videos do |video|
  json.word video.word
  json.title video.title
  json.note video.note
  json.id video.id
end