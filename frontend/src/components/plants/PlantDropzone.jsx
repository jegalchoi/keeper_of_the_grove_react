import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

const DropzoneWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 3px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
`

const getColor = (props) => {
  if (props.isDragActive) {
    return '#2196f3'
  }
  if (props.isDragAccept) {
    return '#00e676'
  }
  if (props.isDragReject) {
    return '#ff1744'
  }
  return '#eeeeee'
}

export const PlantDropzone = (props) => {
  const uploadedFiles = props.uploadedFiles

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      return null
    }

    console.log('queuing images for upload')

    props.setUploadedFiles(acceptedFiles)
  }, [])

  const fileList = (accepted) => {
    const photos = accepted ? uploadedFiles : rejectedFiles

    return (
      <div className='text-center'>
        <h4 className={accepted ? 'text-success' : 'text-danger'}>
          {accepted ? 'Photos to be uploaded:' : 'Rejected files:'}
        </h4>
        <ul className='list-group p-0'>
          {photos.map((file) => (
            <li
              key={file.path}
              className={
                accepted
                  ? 'list-group-item list-group-item-success'
                  : 'list-group-item list-group-item-danger'
              }
            >
              <span>
                {file.path} - {file.size} bytes
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    rejectedFiles,
  } = useDropzone({
    multiple: false,
    accept: 'image/png, image/jpeg',
    minSize: 1024,
    maxSize: 3072000,
    onDrop,
  })

  return (
    <div className='container text-center'>
      <DropzoneWrapper
        {...getRootProps({
          isDragActive,
          isDragAccept,
          isDragReject,
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drag your files to upload here</p>
        ) : uploadedFiles.length > 0 ? null : (
          <React.Fragment>
            <p>
              Drag photos of your plant here, or click to select
              photos from your computer
            </p>
            <em>
              (Only *.jpeg and *.png files less than 3MB will be
              accepted)
            </em>
          </React.Fragment>
        )}
        <aside>
          <div>{uploadedFiles.length > 0 && fileList(true)}</div>
          <div>{rejectedFiles.length > 0 && fileList(false)}</div>
        </aside>
      </DropzoneWrapper>
    </div>
  )
}
