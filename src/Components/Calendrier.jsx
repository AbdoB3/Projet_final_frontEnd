import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Modal, Badge, Button, message as antdMessage, Popconfirm, Form, Checkbox, Input, Space } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const { TextArea } = Input;

export const CalendrierRendezVous = ({ doctorId, doctor }) => {
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
      console.error('Erreur de décodage du token:', error);
    }
  }

  const tranchesHoraires = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/consultation');
        setAppointments(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
        antdMessage.error('Erreur lors de la récupération des rendez-vous. Veuillez réessayer.');
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
  
    const prixConsultation = doctor?.feePer || 0;
  
    const consultationData = {
      doctor_id: doctorId,
      patient_id: patientId,
      date_consultation: selectedDate.format('YYYY-MM-DD'),
      time: selectedTime,
      price: prixConsultation,
      motif_consultation: symptoms,
      consultation_type: 'online',
    };
  
    try {
      const response = await axios.post('http://localhost:3000/consultation', consultationData);
      if (response.status === 200) {
        antdMessage.success('Consultation créée avec succès.');
        fetchAppointments();
        setOpenModal(false);
        setSuccessMessageVisible(true);
      }
    } catch (error) {
      if (error.response) {
        console.error('Le serveur a répondu avec une erreur:', error.response.data);
        antdMessage.error('Échec de la création de la consultation. Veuillez réessayer.');
      } else if (error.request) {
        console.error('Aucune réponse reçue:', error.request);
        antdMessage.error('Aucune réponse du serveur. Veuillez réessayer plus tard.');
      } else {
        console.error('Erreur lors de la configuration de la requête:', error.message);
        antdMessage.error('Une erreur est survenue. Veuillez réessayer plus tard.');
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
              title="Êtes-vous sûr de vouloir supprimer ce rendez-vous ?"
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
      (appointment) => appointment.date_consultation === selectedDateStr
    );

    const availableSlots = tranchesHoraires.filter((slot) => {
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
      antdMessage.success('Rendez-vous supprimé avec succès.');
      setAppointments(appointments.filter(
        (appointment) => appointment._id !== appointmentToDelete._id
      ));
      setDeletionVisible(true);
    } catch (error) {
      console.error('Erreur lors de la suppression du rendez-vous:', error);
      antdMessage.error('Erreur lors de la suppression du rendez-vous. Veuillez réessayer.');
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
        title="Sélectionnez une date, une heure et ajoutez un message"
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
                <h4>Tranches Horaires Disponibles :</h4>
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
                      <Checkbox value="Toux">Toux</Checkbox>
                      <Checkbox value="Fièvre">Fièvre</Checkbox>
                      <Checkbox value="Mal de tête">Mal de tête</Checkbox>
                      <Checkbox value="Fatigue">Fatigue</Checkbox>
                      <Checkbox value="Nausée">Nausée</Checkbox>
                      <Checkbox value="Vomissements">Vomissements</Checkbox>
                      <Checkbox value="Diarrhée">Diarrhée</Checkbox>
                      <Checkbox value="Mal de gorge">Mal de gorge</Checkbox>
                      <Checkbox value="Nez qui coule">Nez qui coule</Checkbox>
                      <Checkbox value="Douleur thoracique">Douleur thoracique</Checkbox>
                      <Checkbox value="Difficulté à respirer">Difficulté à respirer</Checkbox>
                      <Checkbox value="Autre">Autre</Checkbox>
                    </Checkbox.Group>
                  </Form.Item>
                  {/* <Form.Item
                    name="message"
                    label="Message"
                    rules={[{ required: true, message: 'Veuillez ajouter un message!' }]}
                  >
                    <TextArea rows={4} value={message} onChange={handleMessageChange} />
                  </Form.Item> */}
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
          cancelText="Annuler"
        >
          <p>Votre rendez-vous a été créé avec succès !</p>
        </Modal>
        <Modal
          title="Confirmation de suppression"
          visible={deletionVisible}
          onOk={() => setDeletionVisible(false)}
          onCancel={() => setDeletionVisible(false)}
          okText="OK"
          cancelText="Annuler"
        >
          <p>Votre rendez-vous a été supprimé avec succès !</p>
        </Modal>
        <Modal
          title="Succès"
          visible={successMessageVisible}
          onCancel={() => setSuccessMessageVisible(false)}
          onOk={() => setSuccessMessageVisible(false)}
        >
          <p>Votre rendez-vous a été créé avec succès !</p>
        </Modal>
      </div>
    );
  };
  
  const Calendrier = ({ doctorId, doctor }) => {
    return <CalendrierRendezVous doctorId={doctorId} doctor={doctor} />;
  };
  
  export default Calendrier;
