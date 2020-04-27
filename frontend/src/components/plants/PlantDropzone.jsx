import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import request from 'superagent'
import styled from 'styled-components'

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676'
  }
  if (props.isDragReject) {
    return '#ff1744'
  }
  if (props.isDragActive) {
    return '#2196f3'
  }
  return '#eeeeee'
}

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

export const PlantDropzone = (props) => {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [
    uploadedFileCloudinaryURL,
    setUploadedFileCloudinaryURL,
  ] = useState('')

  const CLOUDINARY_UPLOAD_PRESET = 'ksuclyat'
  const CLOUDINARY_UPLOAD_URL =
    'https://api.cloudinary.com/v1_1/diekjezbk/image/upload'

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles)
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0])
      handleImageUpload(acceptedFiles[0])
    }
  }, [])

  const handleImageUpload = (file) => {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file)

    upload.end((error, response) => {
      console.log(response)
      if (error) {
        console.log(error)
      }

      if (response.body.secure_url !== '') {
        setUploadedFileCloudinaryURL(
          props.formDispatch(response.body.secure_url)
        )
      }
    })
  }

  const photoItems = (accepted) => {
    const photos = accepted ? acceptedFiles : rejectedFiles

    return (
      <div className='text-center'>
        <h4 className={accepted ? 'text-success' : 'text-danger'}>
          {accepted ? 'Accepted files:' : 'Rejected files:'}
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
              {file.path} - {file.size} bytes
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
          <p>Drop the files here...</p>
        ) : (
          <p>
            Drag 'n' drop some photos here, or click to select photos
          </p>
        )}
        <em>(Only *.jpeg and *.png images will be accepted)</em>
        <br />
        <aside>
          {uploadedFileCloudinaryURL !== '' &&
            uploadedFileCloudinaryURL}
          <div>{acceptedFiles.length > 0 && photoItems(true)}</div>
          <div>{rejectedFiles.length > 0 && photoItems(false)}</div>
        </aside>
      </DropzoneWrapper>
    </div>
  )
}
