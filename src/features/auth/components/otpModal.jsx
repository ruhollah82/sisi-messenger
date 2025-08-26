import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { Icon } from "@iconify/react";

const OtpModal = ({ visible, phone, onCancel, onSubmit, isLoading }) => {
  const [otpForm] = Form.useForm();

  const styles = {
    otpContainer: {
      padding: "16px",
      textAlign: "center",
      direction: "rtl",
    },
  };

  return (
    <Modal
      title="تأیید OTP"
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
      destroyOnClose
    >
      <div style={styles.otpContainer}>
        <p>
          ما یک کد تأیید به شماره تلفن شما ارسال کرده‌ایم که با .
          <strong> {phone?.slice(-4)}</strong>
          ختم می‌شود
        </p>

        <Form
          form={otpForm}
          layout="vertical"
          onFinish={onSubmit}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="otp"
            label="کد تأیید را وارد کنید"
            rules={[
              {
                required: true,
                message: "لطفا کد تایید را وارد کنید!",
              },
              {
                len: 6,
                message: "کد باید 6 رقمی باشد!",
              },
            ]}
          >
            <Input
              prefix={<Icon icon="mdi:lock-outline" width={20} />}
              placeholder="123456"
              size="large"
              maxLength={6}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={isLoading}
              icon={<Icon icon="mdi:check-circle-outline" width={20} />}
            >
              تأیید کد
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default OtpModal;
