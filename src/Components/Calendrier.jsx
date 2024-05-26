import { useParams, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Calendar, Modal, Badge, Input, Space, Button, message as antdMessage, Popconfirm, Form, Checkbox } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';

const { TextArea } = Input;

const AppointmentCalendar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [message, setMessage] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [deletionVisible, setDeletionVisible] = useState(false);

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const showModal = () => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (token) {
      setIsModalVisible(true); // Show the modal if the token exists
    } else {
      console.error('Vous devez être connecté pour consulter.');
      navigate(`/login?redirect=${location.pathname}`);
    }
  };

  const onSelectDate = (value) => {
    setSelectedDate(value);
    setSelectedTime(null);
    setMessage('');
    setSymptoms([]);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSymptomsChange = (checkedValues) => {
    setSymptoms(checkedValues);
  };

  const handleOk = async () => {
    console.log('doctorId:', doctorId, 'patientId:', patientId);
    if (selectedDate && selectedTime) {
      const newAppointment = {
        date: selectedDate.format('YYYY-MM-DD'),
        time: selectedTime,
        message,
        symptoms,
      };
  
      const appointmentExists = appointments.some(
        (appointment) => appointment.date === newAppointment.date && appointment.time === newAppointment.time
      );
  
      if (appointmentExists) {
        antdMessage.error('An appointment already exists at this time.');
      } else {
        try {
          const response = await axios.post('http://localhost:3000/consultation', {
            doctor_id: doctorId,
            patient_id: patientId,
            date_consultation: `${newAppointment.date}T${newAppointment.time}:00.000Z`,
            motif_consultation: message,
            symptoms: symptoms.join(', '),
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.status === 201) {
            setAppointments([...appointments, newAppointment]);
            setIsModalVisible(false);
            setConfirmationVisible(true);
          } else {
            antdMessage.error('Error booking appointment. Please try again.');
          }
        } catch (error) {
          antdMessage.error('Error booking appointment. Please try again.');
          console.error('Error booking appointment:', error.response ? error.response.data : error.message);
        }
      }
    }
  };
  

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dateCellRender = (value) => {
    const currentDayAppointments = appointments.filter(
      (appointment) => appointment.date === value.format('YYYY-MM-DD')
    );
    return (
      <ul className="events">
        {currentDayAppointments.map((item, index) => (
          <li key={index}>
            <Badge status="success" text={`${item.time}`} />
            <Badge status="success" text={`${item.time}`} />
            <Popconfirm
              title="Are you sure you want to delete this appointment?"
              onConfirm={() => handleDelete(item)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>Delete</Button>
            </Popconfirm>
          </li>
        ))}
      </ul>
    );
  };

  const getAvailableTimeSlots = () => {
    if (!selectedDate) return [];

    const selectedDateStr = selectedDate.format('YYYY-MM-DD');
    const currentDayAppointments = appointments.filter(
      (appointment) => appointment.date === selectedDateStr
    );

    const availableSlots = timeSlots.filter((slot) => {
      const [hour, minute] = slot.split(':').map(Number);
      const slotTime = moment(selectedDate).hours(hour).minutes(minute);
      return currentDayAppointments.every((appointment) => {
        const [appHour, appMinute] = appointment.time.split(':').map(Number);
        const appTime = moment(selectedDate).hours(appHour).minutes(appMinute);
        return Math.abs(slotTime.diff(appTime, 'minutes')) >= 50;
      });
    });

    return availableSlots;
  };

  const handleDelete = (appointmentToDelete) => {
    setAppointments(appointments.filter(
      (appointment) => !(appointment.date === appointmentToDelete.date && appointment.time === appointmentToDelete.time)
    ));
    antdMessage.success('Appointment successfully deleted.');
    setDeletionVisible(true);
  };

  return (
    <div>
      <Button type="primary" open={isModalVisible} onClick={showModal} onOk={handleOk} onCancel={handleCancel} className="bg-indigo-500 w-900
               dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-indigo-700
                dark:hover:bg-gray-700 w-1/2 ">Consulter</Button>
      <Modal
        title="Select a date, time and add a message"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        centered
        style={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
        <Space direction="vertical" size={12} className="w-full">
          <Calendar
            fullscreen={false}
            onSelect={onSelectDate}
            cellRender={dateCellRender}
            className="bg-white p-4 rounded-lg shadow-md"
          />
          {selectedDate && (
            <>
              <h3>Date: {selectedDate.format('YYYY-MM-DD')}</h3>
              <h4>Available Time Slots:</h4>
              <div className="flex flex-wrap">
                {getAvailableTimeSlots().map((slot) => (
                  <button
                    key={slot}
                    value={slot}
                    onClick={handleTimeChange}
                    className={`m-2 p-2 border rounded ${
                      selectedTime === slot ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <Form>
                <Form.Item
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
                </Form.Item>
              </Form>
              <TextArea
                value={message}
                onChange={handleMessageChange}
                placeholder="Add a message"
                rows={4}
              />
            </>
          )}
        </Space>
      </Modal>

      <Modal
        title="Confirmation"
        open={confirmationVisible}
        onOk={() => setConfirmationVisible(false)}
        onCancel={() => setConfirmationVisible(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setConfirmationVisible(false)}>
            Ok
          </Button>
        ]}
      >
        <div className="flex items-center justify-center flex-col">
          <CheckCircleOutlined className="text-green-500 text-4xl mb-2" />
          <p>Your appointment has been successfully booked.</p>
        </div>
      </Modal>

      <Modal
        title="Deletion Confirmation"
        open={deletionVisible}
        onOk={() => setDeletionVisible(false)}
        onCancel={() => setDeletionVisible(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setDeletionVisible(false)}>
            Ok
          </Button>
        ]}
      >
        <div className="flex items-center justify-center flex-col">
          <CloseCircleOutlined className="text-red-500 text-4xl mb-2" />
          <p>Your appointment has been successfully deleted.</p>
        </div>
      </Modal>
    </div>
  );
};

export default AppointmentCalendar;

