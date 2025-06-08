export interface CustomState {
  id: number;
  parent_id: number;
  parentSecond_id: number;
  title: string;
  pageName: string;
  filter_params: string;
  description: string;
  pageType: string;
  meta_keyword: [{ id: number; content: string; parent_id: number }];
}

export interface CustomNavbar {
  id: number;
  pageType: string;
  name: string;
  level: number;
  url: string;
  created_at: Date;
  updated_at: Date;
  child: [
    {
      id: number;
      pageType: string;
      parent_id: number;
      name: string;
      url: string;
      created_at: Date;
      updated_at: Date;
    }
  ];
  seo: [
    {
      id: number;
      parent_id: number;
      title: string;
      pageName: string;
      description: string;
      keyword: [
        {
          id: number;
          content: string;
          parent_id: number;
          created_at: Date;
          updated_at: Date;
        }
      ];
      created_at: Date;
      updated_at: Date;
    }
  ];
}

export interface Keyword {
  id: number;
  content: string;
  parent_id: number;
  created_at: Date;
  updated_at: Date;
}

interface CustomPageInitalState {
  error: string | null;
  loading: boolean;
  category: CustomNavbar[] | null;
  responsiveMenu: boolean;
  custom: CustomState[] | null;
  openMenu: boolean | null;
  changeMenu: boolean;
}

export const initialState: CustomPageInitalState = {
  error: null,
  changeMenu: false,
  custom: null,
  responsiveMenu: false,
  loading: false,
  category: null,
  openMenu: null,
};
