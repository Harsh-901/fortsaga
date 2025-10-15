const { supabase } = require("../db/supabase");

async function getMedia(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .order("upload_date", { ascending: false });

    if (error) throw error;

    // Map to the format expected by frontend
    const mappedData = data.map((media) => ({
      id: media.id,
      name: media.name,
      type: media.type,
      size: media.size,
      fort: media.fort,
      category: media.category,
      uploadDate: new Date(media.upload_date).toISOString().split("T")[0],
      uploadedBy: media.uploaded_by,
      description: media.description,
      tags: media.tags || [],
      url: media.url,
      thumbnail: media.thumbnail,
    }));

    res.json(mappedData);
  } catch (err) {
    next(err);
  }
}

async function uploadMedia(req, res, next) {
  try {
    const { files, fort, category, description, tags } = req.body;

    // For now, we'll simulate the upload since we can't handle file uploads in this backend
    // In a real implementation, you'd handle file uploads here

    const uploadedMedia = [];

    for (const file of files) {
      const { data, error } = await supabase
        .from("media")
        .insert([{
          name: file.name,
          type: file.type,
          size: file.size,
          fort,
          category,
          upload_date: new Date().toISOString(),
          uploaded_by: "Admin", // In real app, get from auth
          description,
          tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
          url: file.url || file.preview, // Use preview as placeholder
          thumbnail: file.thumbnail || file.preview,
        }])
        .select();

      if (error) throw error;
      uploadedMedia.push(data[0]);
    }

    res.status(201).json(uploadedMedia);
  } catch (err) {
    next(err);
  }
}

async function deleteMedia(req, res, next) {
  try {
    const { id } = req.params;

    // First get the media item to get the file path
    const { data: mediaItem, error: fetchError } = await supabase
      .from("media")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // Delete from storage if it exists
    if (mediaItem.url && mediaItem.url.includes('supabase')) {
      // Extract file path from URL
      const urlParts = mediaItem.url.split('/');
      const fileName = urlParts[urlParts.length - 1];

      await supabase.storage
        .from('media')
        .remove([fileName]);
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from("media")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

    res.json({ message: "Media deleted successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = { getMedia, uploadMedia, deleteMedia };
