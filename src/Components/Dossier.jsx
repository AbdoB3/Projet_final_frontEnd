import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const MedicalForm = () => {
  const [showOtherAllergies, setShowOtherAllergies] = useState(false);
  const [showOtherOperations, setShowOtherOperations] = useState(false);
  const [showOtherMedications, setShowOtherMedications] = useState(false);
  const [showOtherDiseases, setShowOtherDiseases] = useState(false);

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    
    try {
      const response = await axios.post('http://localhost:3000/medical', values);
      console.log('Form submitted successfully:', response.data);
      message.success('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Failed to submit the form. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-7 max-w-5xl w-full bg-white rounded-xl shadow-lg space-y-4 overflow-y-auto max-h-[95vh]">
        <h1 className="text-2xl font-bold">Formulaire Médical</h1>
        <Form
          name="medical_form"
          layout="vertical"
          onFinish={onFinish}
        >
         
      
          {/* <Form.Item
            name="symptoms"
            label="Symptômes"
            rules={[{ required: true, message: 'Veuillez décrire vos symptômes!' }]}
          >
            <Checkbox.Group>
              <Checkbox value="Cough">Toux</Checkbox>
              <Checkbox value="Fever">Fièvre</Checkbox>
              <Checkbox value="Headache">Mal de tête</Checkbox>
              <Checkbox value="Fatigue">Fatigue</Checkbox>
              <Checkbox value="Nausea">Nausée</Checkbox>
              <Checkbox value="Vomiting">Vomissements</Checkbox>
              <Checkbox value="Diarrhea">Diarrhée</Checkbox>
              <Checkbox value="SoreThroat">Mal de gorge</Checkbox>
              <Checkbox value="ShortnessOfBreath">Essoufflement</Checkbox>
              <Checkbox value="ChestPain">Douleur à la poitrine</Checkbox>
              <Checkbox value="MusclePain">Douleur musculaire</Checkbox>
              <Checkbox value="Dizziness">Vertiges</Checkbox>
              <Checkbox value="LossOfTasteOrSmell">Perte de goût ou d'odorat</Checkbox>
              <Checkbox value="Other">Autre</Checkbox>
            </Checkbox.Group>
          </Form.Item> */}
          <Form.Item
            name="allergies"
            label="Avez-vous des allergies ?"
            rules={[{ required: true, message: 'Veuillez sélectionner vos allergies!' }]}
          >
            <Checkbox.Group onChange={(checkedValues) => setShowOtherAllergies(checkedValues.includes("Other"))}>
              <Checkbox value="Pollen">Pollen</Checkbox>
              <Checkbox value="Dust">Poussière</Checkbox>
              <Checkbox value="Food">Nourriture</Checkbox>
              <Checkbox value="Medicines">Médicaments</Checkbox>
              <Checkbox value="Other">Autre</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          {showOtherAllergies && (
            <Form.Item
              name="other_allergies"
              label="Autres Allergies"
              rules={[{ required: true, message: 'Veuillez entrer vos autres allergies!' }]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item
            name="operations"
            label="Avez-vous déjà subi une opération ?"
            rules={[{ required: true, message: 'Veuillez indiquer si vous avez subi une opération!' }]}
          >
            <Checkbox.Group onChange={(checkedValues) => setShowOtherOperations(checkedValues.includes("Other"))}>
              <Checkbox value="Appendix">Appendice</Checkbox>
              <Checkbox value="Gallbladder">Vésicule biliaire</Checkbox>
              <Checkbox value="Heart">Cœur</Checkbox>
              <Checkbox value="Other">Autre</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          {showOtherOperations && (
            <Form.Item
              name="other_operations"
              label="Autres Opérations"
              rules={[{ required: true, message: 'Veuillez entrer vos autres opérations!' }]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item
            name="medications"
            label="Prenez-vous des médicaments ?"
            rules={[{ required: true, message: 'Veuillez indiquer si vous prenez des médicaments!' }]}
          >
            <Checkbox.Group onChange={(checkedValues) => setShowOtherMedications(checkedValues.includes("Other"))}>
              <Checkbox value="Antibiotics">Antibiotiques</Checkbox>
              <Checkbox value="Painkillers">Analgésiques</Checkbox>
              <Checkbox value="Insulin">Insuline</Checkbox>
              <Checkbox value="Other">Autre</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          {showOtherMedications && (
            <Form.Item
              name="other_medications"
              label="Autres Médicaments"
              rules={[{ required: true, message: 'Veuillez entrer vos autres médicaments!' }]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item
            name="diseases"
            label="Avez-vous une maladie chronique ?"
            rules={[{ required: true, message: 'Veuillez sélectionner vos maladies chroniques!' }]}
          >
            <Select
              mode="multiple"
              allowClear
              onChange={(values) => setShowOtherDiseases(values.includes("Other"))}
            >
              <Option value="Diabetes">Diabète</Option>
              <Option value="Hypertension">Hypertension</Option>
              <Option value="Asthma">Asthme</Option>
              <Option value="Cancer">Cancer</Option>
              <Option value="Other">Autre</Option>
            </Select>
          </Form.Item>
          {showOtherDiseases && (
            <Form.Item
              name="other_diseases"
              label="Autres Maladies"
              rules={[{ required: true, message: 'Veuillez entrer vos autres maladies!' }]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Soumettre
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default MedicalForm;
