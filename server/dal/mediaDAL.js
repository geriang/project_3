const { Media } = require('../model');

exports.createMedia = (media_url, media_type, listing_detail_id) => {
  const mediaData = new Media({
    media_url,
    media_type,
    listing_detail_id,
    created_at: Date.now()
  });
  return mediaData.save()
};

exports.getMediaForMainDisplay = () => {
  return Media.fetchAll({ columns: ['listing_detail_id','media_url']})
};

exports.getMediaByListingId = async (lid) => {
  return await Media.where({'listing_detail_id': lid}).fetchAll({
    columns: ['listing_detail_id','media_url']
  })
}

