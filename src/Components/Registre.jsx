import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Upload, TimePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';


const Registre = () => {

  const [form] = Form.useForm();


  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const uploadProps = {
    name: 'file', // Cloudinary expects the file data under the 'file' key
    action: 'https://api.cloudinary.com/v1_1/doagzivng/image/upload', // Replace 'your_cloud_name' with your actual Cloudinary cloud name
    data: {
      upload_preset: 'kj1jodbh', // Use the preset you created at the Cloudinary dashboard
    },
    listType: 'picture',
    onChange(info) {
      if (info.file.status === 'uploading') {
        console.log('Uploading...');
      }
      if (info.file.status === 'done') {
        console.log('File uploaded:', info.file.response); // Success
      } else if (info.file.status === 'error') {
        console.error('Upload error:', info.file.error, info.file.response); // Handle errors
      }
    }
  };
  return (

    <div className="p-4">
      <h2 className="text-2xl font-bold mb-10 text-center">
        <span className="font-bold text-2xl" style={{ color: '#395886' }}>Lancez-vous  avec Nous : </span>
     
      </h2>


      <Form
        form={form}
        {...formItemLayout}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="justify-text shadow-md  p-4 border black"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
          <Form.Item label="Prénom" name="firstname" rules={[{ required: false, message: 'Veuillez saisir votre prénom !' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Nom " name="lastname" rules={[{ required: false, message: 'Veuillez saisir votre nom de famille !' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: false, message: 'Veuillez saisir votre adresse e-mail !' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mot de passe" name="password" rules={[{ required: false, message: 'Veuillez saisir votre mot de passe !' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="Téléphone" name="phone" rules={[{ required: false, message: 'Veuillez saisir votre numéro de téléphone !' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Sexe" name="sex" rules={[{ required: false, message: 'Veuillez sélectionner votre sexe !' }]}>
            <Select>
              <Select.Option value="male">Homme</Select.Option>
              <Select.Option value="female">Femme</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Ville" name={['address', 'city']} rules={[{ required: false, message: 'Veuillez saisir votre ville !' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="État" name={['address', 'state']} rules={[{ required: false, message: 'Veuillez saisir votre état !' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Pays" name={['address', 'country']} rules={[{ required: false, message: 'Veuillez saisir votre pays !' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Spécialité" name="speciality" rules={[{ required: false, message: 'Veuillez saisir votre spécialité !' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Expérience" name="experience" rules={[{ required: false, message: 'Veuillez saisir votre expérience !' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Frais par" name="feePer" rules={[{ required: false, message: 'Veuillez saisir vos frais par !' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Image" name="image">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Télécharger</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="De" name="fromTime" rules={[{ required: false, message: 'Veuillez saisir votre heure de début !' }]}>
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item label="À" name="toTime" rules={[{ required: false, message: 'Veuillez saisir votre heure de fin !' }]}>
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: false, message: 'Veuillez saisir votre description !' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" htmlType="submit" icon={<FontAwesomeIcon icon={faSave} />}>
              Enregistrer
            </Button>
          </Form.Item>
        </div>


      </Form>
      <Footer />
    </div>

  );
};

export default Registre;