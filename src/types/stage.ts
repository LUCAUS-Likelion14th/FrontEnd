export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface Stage {
  stage_id: number;
  performer: string;
  logoImage: string;
}

export interface Song {
  song_id: number;
  title: string;
  play_order: number;
}

export interface StageDetail {
  stage_id: number;
  time: string;
  stage_info: string;
  performer: string;
  performer_image: string;
  instagram: string;
  youtube: string;
  songs?: Song[];
}

export interface TimeTable {
  stage_id: number;
  start_at: string;
  end_at: string;
  time: string;
  status: string;
  logo_image: string;
  performer: string;
  category: string;
}
