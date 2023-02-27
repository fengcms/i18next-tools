import request from '@/utils/request'

export const addDict = (data: any): Promise<any> => {
  return request({
    url: 'dicts',
    method: 'post',
    data
  })
}

export interface DictsItemProps {
  id: number
  pid: number
  key: string
  en: string | null
  zh: string | null
  ja: string | null
  fr: string | null
  ko: string | null
  es: string | null
  tr: string | null
  mark: string | null
  node: number
  time: string
}

export interface DictsListProps {
  page: number
  list: DictsItemProps[]
  count: number
  pageSize: number
}

export const getDicts = (params: any): Promise<DictsListProps> => {
  return request({
    url: 'dicts',
    method: 'get',
    params
  })
}

export const getDict = (id: string | number): Promise<DictsItemProps> => {
  return request({
    url: `dicts/${id}`,
    method: 'get'
  })
}

export const editDict = (id: string | number, data: any) => {
  return request({
    url: `dicts/${id}`,
    method: 'put',
    data
  })
}

export const deleteDict = async (id: string | number): Promise<boolean> => {
  const child = await getDicts({ pid: id, pageSize: 1 })
  if (child.count === 0) {
    await request({
      url: `dicts/${id}`,
      method: 'delete'
    })
    return true
  }
  return false
}
