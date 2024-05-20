// Calendrier 


import React, { useState, useEffect } from 'react';
import { Calendar, Modal, Badge, Input, Space, Button, message as antdMessage, Popconfirm } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;

const AppointmentCalendar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [message, setMessage] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [deletionVisible, setDeletionVisible] = useState(false);

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const openModal = () => {
    setIsModalVisible(true);
  };

  const onSelectDate = (value) => {
    setSelectedDate(value);
    setSelectedTime(null); // Reset selected time when a new date is selected
    setMessage(''); // Reset message when a new date is selected
    console.log('Selected Date:', value.format('YYYY-MM-DD')); // Log the selected date
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleOk = () => {
    if (selectedDate && selectedTime) {
      const newAppointment = {
        date: selectedDate.format('YYYY-MM-DD'),
        time: selectedTime,
        message,
      };

      // Check if the appointment already exists
      const appointmentExists = appointments.some(
        (appointment) => appointment.date === newAppointment.date && appointment.time === newAppointment.time
      );

      if (appointmentExists) {
        antdMessage.error('Un rendez-vous existe déjà à cette heure.');
      } else {
        setAppointments([...appointments, newAppointment]);
        setIsModalVisible(false);
        setConfirmationVisible(true);
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
           <Badge status="success" text={item.time} />

            <Popconfirm
              title="Êtes-vous sûr de vouloir supprimer ce rendez-vous?"
              onConfirm={() => handleDelete(item)}
              okText="Oui"
              cancelText="Non"
            >
              <Button type="link" danger>Supprimer</Button>
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
    antdMessage.success('Rendez-vous supprimé avec succès.');
    setDeletionVisible(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">Prendre un rendez-vous</h1>
      <Button type="primary" onClick={openModal}>Ouvrir le calendrier</Button>
      <Modal
        title="Sélectionnez une date, une heure et ajoutez un message"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        centered // Centrer le modal
        style={{ maxHeight: '70vh', overflowY: 'auto' }} // Ajout du défilement interne
      >
        <Space direction="vertical" size={12} className="w-full">
          <Calendar
            fullscreen={false}
            onSelect={onSelectDate}
            dateCellRender={dateCellRender}
            className="bg-white p-4 rounded-lg shadow-md"
          />
          {selectedDate && (
            <>
              <h3>Date: {selectedDate.format('YYYY-MM-DD')}</h3>
              <h4>Heure disponible:</h4>
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
              <TextArea
                value={message}
                onChange={handleMessageChange}
                placeholder="Ajouter un message"
                rows={4}
              />
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
          <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
          <p className="mt-4">Votre rendez-vous a été pris avec succès.</p>
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
          <CloseCircleOutlined style={{ fontSize: '48px', color: '#f5222d' }} />
          <p className="mt-4">Votre rendez-vous a été supprimé avec succès.</p>
        </div>
      </Modal>
    </div>
  );
};

export default AppointmentCalendar;