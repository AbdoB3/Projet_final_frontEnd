import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Modal, Badge, Button, message as antdMessage, Popconfirm, Form, Checkbox, Input, Space } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const { TextArea } = Input;

export const AppointmentCalendar = ({ doctorId, doctor }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [deletionVisible, setDeletionVisible] = useState(false);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');
  let patientId = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      patientId = decodedToken.userId;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/consultation');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        antdMessage.error('Error fetching appointments. Please try again.');
      }
    };

    fetchAppointments();
  }, []);

  const showModal = () => {
    if (token) {
      setOpenModal(true);
    } else {
      antdMessage.error('Vous devez être connecté pour consulter.');
      navigate(`/login?redirect=${location.pathname}`);
    }
  };

  const onSelectDate = (value) => {
    setSelectedDate(value);
    setSelectedTime(null);
    setSymptoms([]);
  };

  const handleTimeChange = (slot) => {
    setSelectedTime(slot);
  };

  const handleSymptomsChange = (checkedValues) => {
    setSymptoms(checkedValues);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleOk = async () => {
    if (!selectedDate || !selectedTime) {
      antdMessage.error('Veuillez sélectionner une date et une heure.');
      return;
    }
  
    const consultationPrice = doctor?.feePer || 0;
  
    const consultationData = {
      doctor_id: doctorId,
      patient_id: patientId,
      date_consultation: selectedDate.format('YYYY-MM-DD'),
      time: selectedTime,
      price: consultationPrice,
      motif_consultation: symptoms,
      consultation_type: 'online',
    };
  
    try {
      const response = await axios.post('http://localhost:3000/consultation', consultationData);
      if (response.status === 200) {
        antdMessage.success('Consultation successfully created.');
        fetchAppointments();
        setOpenModal(false);
        setSuccessMessageVisible(true);
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with error:', error.response.data);
        antdMessage.error('Failed to create consultation. Please try again.');
      } else if (error.request) {
        console.error('No response received:', error.request);
        antdMessage.error('No response received from server. Please try again later.');
      } else {
        console.error('Error setting up request:', error.message);
        antdMessage.error('An error occurred. Please try again later.');
      }
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const cellRender = (value) => {
    const currentDayAppointments = appointments.filter(
      (appointment) => appointment.date_consultation === value.format('YYYY-MM-DD')
    );
    return (
      <ul className="events">
        {currentDayAppointments.map((item, index) => (
          <li key={index}>
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
      (appointment) => appointment.date_consultation === selectedDateStr
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

  const handleDelete = async (appointmentToDelete) => {
    try {
      const response = await axios.delete(`http://localhost:3000/consultation/${appointmentToDelete._id}`);
      antdMessage.success('Appointment successfully deleted.');
      setAppointments(appointments.filter(
        (appointment) => appointment._id !== appointmentToDelete._id
      ));
      setDeletionVisible(true);
    } catch (error) {
      console.error('Error deleting appointment:', error);
      antdMessage.error('Error deleting appointment. Please try again.');
    }
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        className="bg-indigo-500 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-indigo-700 dark:hover:bg-gray-700 w-1/2"
      >
        Consulter
      </Button>
      <Modal
        title="Select a date, time and add a message"
        open={openModal}
        onCancel={handleCancel}
        width={800}
        centered
        style={{ maxHeight: '70vh', overflowY: 'auto' }}
        onOk={handleOk}
      >
        <Space
          direction="vertical" size={12} className="w-full">
          <Calendar
            fullscreen={false}
            onSelect={onSelectDate}
            cellRender={cellRender}
              Render={cellRender}
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
                      onClick={() => handleTimeChange(slot)}
                      className={`m-2 p-2 border rounded ${selectedTime === slot ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
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
                    <Checkbox.Group onChange={handleSymptomsChange}>
                      <Checkbox value="Cough">Toux</Checkbox>
                      <Checkbox value="Fever">Fièvre</Checkbox>
                      <Checkbox value="Headache">Mal de tête</Checkbox>
                      <Checkbox value="Fatigue">Fatigue</Checkbox>
                      <Checkbox value="Nausea">Nausée</Checkbox>
                      <Checkbox value="Vomiting">Vomissements</Checkbox>
                      <Checkbox value="Diarrhea">Diarrhée</Checkbox>
                      <Checkbox value="SoreThroat">Mal de gorge</Checkbox>
                      <Checkbox value="RunnyNose">Nez qui coule</Checkbox>
                      <Checkbox value="ChestPain">Douleur thoracique</Checkbox>
                      <Checkbox value="DifficultyBreathing">Difficulté à respirer</Checkbox>
                      <Checkbox value="Other">Autre</Checkbox>
                    </Checkbox.Group>
                  </Form.Item>
                  <Form.Item
                    name="message"
                    label="Message"
                    rules={[{ required: true, message: 'Veuillez ajouter un message!' }]}
                  >
                    <TextArea rows={4} value={message} onChange={handleMessageChange} />
                  </Form.Item>
                </Form>
              </>
            )}
          </Space>
        </Modal>
        <Modal
          title="Confirmation"
          visible={confirmationVisible}
          onOk={() => setConfirmationVisible(false)}
          onCancel={() => setConfirmationVisible(false)}
          okText="OK"
          cancelText="Cancel"
        >
          <p>Your appointment has been successfully created!</p>
        </Modal>
        <Modal
          title="Deletion Confirmation"
          visible={deletionVisible}
          onOk={() => setDeletionVisible(false)}
          onCancel={() => setDeletionVisible(false)}
          okText="OK"
          cancelText="Cancel"
        >
          <p>Your appointment has been successfully deleted!</p>
        </Modal>
        <Modal
          title="Success"
          visible={successMessageVisible}
          onCancel={() => setSuccessMessageVisible(false)}
          onOk={() => setSuccessMessageVisible(false)}
        >
          <p>Your appointment has been successfully created!</p>
        </Modal>
      </div>
    );
  };
  
  const Calendrier = ({ doctorId, doctor }) => {
    return <AppointmentCalendar doctorId={doctorId} doctor={doctor} />;
  };
  
  export default Calendrier;
  