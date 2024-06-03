import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
  const [appointments, setAppointments] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [deletionVisible, setDeletionVisible] = useState(false);

  const { doctor_id, patient_id } = useParams();

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  // Fetch appointments when component mounts
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/consultation`);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        antdMessage.error('Error fetching appointments. Please try again.');
      }
    };

    fetchAppointments();
  }, []);

  const showModal = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsModalVisible(true);
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

  const handleOk = () => {
    if (!selectedDate || !selectedTime) {
      antdMessage.error('Veuillez sélectionner une date et une heure.');
      return;
    }
    const consultationData = {
      doctor_id,
      patient_id,
      date_consultation: selectedDate.format('YYYY-MM-DD'),
      time: selectedTime,
      motif_consultation: symptoms,
    };

    axios.post('http://localhost:3000/consultation', consultationData)
      .then(response => {
        antdMessage.success('Consultation successfully created.');
        setIsModalVisible(false);
        setConfirmationVisible(true);
        // Refresh appointments after successful creation
        fetchAppointments();
      })
      .catch(error => {
        console.error('Error creating consultation:', error);
        antdMessage.error('Error creating consultation. Please try again.');
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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

  const handleDelete = (appointmentToDelete) => {
    axios.delete(`http://localhost:3000/consultation/${appointmentToDelete._id}`)
      .then(response => {
        antdMessage.success('Appointment successfully deleted.');
        setAppointments(appointments.filter(
          (appointment) => appointment._id !== appointmentToDelete._id
        ));
        setDeletionVisible(true);
      })
      .catch(error => {
        console.error('Error deleting appointment:', error);
        antdMessage.error('Error deleting appointment. Please try again.');
      });
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
        visible={isModalVisible}
        onCancel={handleCancel}
        width={800}
        centered
        style={{ maxHeight: '70vh', overflowY: 'auto' }}
        onOk={handleOk}
      >
        <Space direction="vertical" size={12} className="w-full">
          <Calendar
            fullscreen={false}
            onSelect={onSelectDate}
            cellRender={cellRender}
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
                    <Checkbox value="Other">Autre</Checkbox>
                  </Checkbox.Group>
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
        title="Suppression"
        visible={deletionVisible}
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
