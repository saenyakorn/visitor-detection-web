import { CaptureDTO } from 'dto/capture'
import { DeviceDTO } from 'dto/devices'
import { createContext, useContext } from 'react'
import useSWR from 'swr'
import { MutatorCallback } from 'swr/dist/types'
import { httpClient } from '../config/http'

export interface DataConstruct {
  deviceData: DeviceDTO[] | undefined
  deviceError: Error
  deviceMutate: (
    data?: DeviceDTO[] | Promise<DeviceDTO[]> | MutatorCallback<DeviceDTO[]> | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<DeviceDTO[] | undefined>
  captureData: CaptureDTO[] | undefined
  captureError: Error
  captureMutate: (
    data?: CaptureDTO[] | Promise<CaptureDTO[]> | MutatorCallback<CaptureDTO[]> | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<CaptureDTO[] | undefined>
}

const deviceFetcher = () => httpClient.get<DeviceDTO[]>('/api/devices').then(result => result.data)

const captureFetcher = () =>
  httpClient.get<CaptureDTO[]>('/api/captures').then(result => result.data)

export const DataContext = createContext({} as DataConstruct)

export const DataProvider: React.FC = props => {
  const { data: deviceData, error: deviceError, mutate: deviceMutate } = useSWR(
    '/api/devices',
    deviceFetcher,
  )

  const { data: captureData, error: captureError, mutate: captureMutate } = useSWR(
    '/api/captures',
    captureFetcher,
    // {
    //   refreshInterval: 10000,
    // },
  )

  const value = { deviceData, deviceError, deviceMutate, captureData, captureError, captureMutate }
  return <DataContext.Provider value={value} {...props} />
}

export const useData = () => useContext(DataContext)
