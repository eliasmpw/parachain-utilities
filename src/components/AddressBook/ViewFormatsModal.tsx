import { Button, Form, Input, Modal, Row, Space } from "antd"
import React, { useEffect, useState } from "react"
import { addAddress } from "../../store/actions/addressActions"
import { useAppDispatch } from "../../store/hooks"
import { SubstrateAddress } from "../../types"

type ViewFormatsModalProps = {
  selectedAddress?: SubstrateAddress
  showModal: boolean
  setShowModal: (value: boolean) => void
}

function ViewFormatsModal(props: ViewFormatsModalProps): React.ReactElement {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const [formats, setFormats] = useState<string[]>([])

  const { showModal, setShowModal, selectedAddress } = props

  useEffect(() => {
    if (selectedAddress) {
      const newFormats = []
      newFormats.push(selectedAddress.value)
      newFormats.push(selectedAddress.value)
      setFormats(newFormats)
    }
  }, [selectedAddress])

  const onFormSubmit = (address: SubstrateAddress) => {
    dispatch(addAddress(address))
    handleClose()
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <Modal
      className='view-formats-modal'
      visible={showModal}
      title='View formats'
      onCancel={handleClose}
      footer={null}>
      <h2>Address</h2>
      <Row>{selectedAddress?.name}</Row>
      <Row>{selectedAddress?.value}</Row>
      <h2>Other formats</h2>
      {formats.map((auxFormat, index) => {
        return <Row key={index}>{auxFormat}</Row>
      })}
      <Row justify='end'>
        <Space>
          <Button
            htmlType='button'
            onClick={() => {
              handleClose()
            }}>
            Close
          </Button>
        </Space>
      </Row>
    </Modal>
  )
}

export default ViewFormatsModal