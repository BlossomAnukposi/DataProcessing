CREATE OR REPLACE FUNCTION public.update_subtitle_by_id(
    p_subtitle_id INTEGER,
    p_language VARCHAR(50),
    p_content TEXT,
    p_movie_id INTEGER,
    p_episode_id INTEGER
)
RETURNS TABLE (
    subtitle_id INTEGER,
    language VARCHAR(50),
    content TEXT,
    movie_id INTEGER,
    episode_id INTEGER
) AS $$
BEGIN
    RETURN QUERY
    UPDATE subtitle s
    SET 
        language = COALESCE(p_language, s.language),
        content = COALESCE(p_content, s.content),
        movie_id = COALESCE(p_movie_id, s.movie_id),
        episode_id = COALESCE(p_episode_id, s.episode_id)
    WHERE s.subtitle_id = p_subtitle_id
    RETURNING 
        s.subtitle_id,
        s.language,
        s.content,
        s.movie_id,
        s.episode_id;
END;
$$ LANGUAGE plpgsql; 