import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image, Modal } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MainScreen = ({ navigation }) => {
  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [isWodModalVisible, setWodModalVisible] = React.useState(false);

  // Función para obtener el lunes de la semana actual
  const getMonday = (d) => {
    d = new Date(d);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Ajustar a Lunes (1), si es Domingo (0) restar 6
    return new Date(d.setDate(diff));
  };

  const today = new Date();
  const initialMonday = getMonday(today);

  const [selectedDay, setSelectedDay] = React.useState(today.toISOString().split('T')[0]); // Guarda la fecha en formato YYYY-MM-DD

  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(initialMonday);
    date.setDate(initialMonday.getDate() + i);
    const dayLabel = ['D', 'L', 'M', 'X', 'J', 'V', 'S'][date.getDay()];
    return {
      label: dayLabel,
      date: date.getDate().toString(),
      fullDate: date.toISOString().split('T')[0],
    };
  });

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', day: '2-digit', month: '2-digit' };
    return date.toLocaleDateString('es-ES', options);
  };

  const classesByDate = {
    // Clases para Lunes (ajusta la fecha al lunes actual que se genere)
    [days[0].fullDate]: [
      { id: '1', name: 'CROSSFIT - TRIANA', time: '07:00', attendees: [
        { id: 'u1', avatar: 'https://i.pravatar.cc/150?img=1', hasCheck: false, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'u2', avatar: 'https://i.pravatar.cc/150?img=2', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'u3', avatar: 'https://i.pravatar.cc/150?img=3', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'u4', avatar: 'https://i.pravatar.cc/150?img=4', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'u5', avatar: 'https://i.pravatar.cc/150?img=5', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'u6', avatar: 'https://i.pravatar.cc/150?img=6', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'u7', avatar: 'https://i.pravatar.cc/150?img=7', hasCheck: true, hasG: true, hasBookmark: false, isHighlighted: true },
        { id: 'u8', avatar: 'https://i.pravatar.cc/150?img=8', hasCheck: false, hasG: false, hasBookmark: true, isHighlighted: true },
        { id: 'u9', avatar: 'https://i.pravatar.cc/150?img=9', hasCheck: true, hasG: true, hasBookmark: false, isHighlighted: false },
      ]},
      { id: '2', name: 'PILATES - SALA A', time: '09:00', attendees: [
        { id: 'p1', avatar: 'https://i.pravatar.cc/150?img=12', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'p2', avatar: 'https://i.pravatar.cc/150?img=13', hasCheck: false, hasG: false, hasBookmark: false, isHighlighted: false },
      ]},
    ],
    // Clases para Martes (ajusta la fecha)
    [days[1].fullDate]: [
      { id: '3', name: 'YOGA - ESTUDIO', time: '08:00', attendees: [
        { id: 'y1', avatar: 'https://i.pravatar.cc/150?img=14', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'y2', avatar: 'https://i.pravatar.cc/150?img=15', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
      ]},
      { id: '4', name: 'ENDURANCE - PISTA', time: '17:00', attendees: [
        { id: 'e1', avatar: 'https://i.pravatar.cc/150?img=16', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'e2', avatar: 'https://i.pravatar.cc/150?img=17', hasCheck: false, hasG: false, hasBookmark: false, isHighlighted: false },
      ]},
    ],
    // Clases para Miércoles (ajusta la fecha)
    [days[2].fullDate]: [
      { id: '5', name: 'CROSSFIT - MAÑANA', time: '07:30', attendees: [
        { id: 'c1', avatar: 'https://i.pravatar.cc/150?img=18', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'c2', avatar: 'https://i.pravatar.cc/150?img=19', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
      ]},
      { id: '6', name: 'ZUMBA - SALA B', time: '18:00', attendees: [
        { id: 'z1', avatar: 'https://i.pravatar.cc/150?img=20', hasCheck: false, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'z2', avatar: 'https://i.pravatar.cc/150?img=21', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
      ]},
    ],
    // Clases para Jueves
    [days[3].fullDate]: [
      { id: '7', name: 'BOXEO - RING', time: '19:00', attendees: [
        { id: 'b1', avatar: 'https://i.pravatar.cc/150?img=22', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'b2', avatar: 'https://i.pravatar.cc/150?img=23', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
      ]},
      { id: '8', name: 'FUNCIONAL - PARQUE', time: '10:00', attendees: [
        { id: 'f1', avatar: 'https://i.pravatar.cc/150?img=24', hasCheck: false, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'f2', avatar: 'https://i.pravatar.cc/150?img=25', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
      ]},
    ],
    // Clases para Viernes
    [days[4].fullDate]: [
      { id: '9', name: 'CROSSFIT - TARDE', time: '16:00', attendees: [
        { id: 'ct1', avatar: 'https://i.pravatar.cc/150?img=26', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'ct2', avatar: 'https://i.pravatar.cc/150?img=27', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
      ]},
      { id: '10', name: 'RECOVERY - SPA', time: '20:00', attendees: [
        { id: 'r1', avatar: 'https://i.pravatar.cc/150?img=28', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'r2', avatar: 'https://i.pravatar.cc/150?img=29', hasCheck: false, hasG: false, hasBookmark: false, isHighlighted: false },
      ]},
    ],
    // Clases para Sábado
    [days[5].fullDate]: [
      { id: '11', name: 'STRONGMAN - GARAJE', time: '11:00', attendees: [
        { id: 's1', avatar: 'https://i.pravatar.cc/150?img=30', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 's2', avatar: 'https://i.pravatar.cc/150?img=31', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
      ]},
      { id: '12', name: 'HIIT - PATIO', time: '14:00', attendees: [
        { id: 'h1', avatar: 'https://i.pravatar.cc/150?img=32', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'h2', avatar: 'https://i.pravatar.cc/150?img=33', hasCheck: false, hasG: false, hasBookmark: false, isHighlighted: false },
      ]},
    ],
    // Clases para Domingo
    [days[6].fullDate]: [
      { id: '13', name: 'MOVILIDAD - SALA RELAX', time: '10:00', attendees: [
        { id: 'm1', avatar: 'https://i.pravatar.cc/150?img=34', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'm2', avatar: 'https://i.pravatar.cc/150?img=35', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
      ]},
      { id: '14', name: 'RECUPERACIÓN ACTIVA - PISCINA', time: '15:00', attendees: [
        { id: 'ra1', avatar: 'https://i.pravatar.cc/150?img=36', hasCheck: false, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'ra2', avatar: 'https://i.pravatar.cc/150?img=37', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
      ]},
    ],
  };

  const currentClasses = classesByDate[selectedDay] || [];

  const times = Array.from(new Set(currentClasses.map(clase => clase.time))).sort();

  const [selectedTime, setSelectedTime] = React.useState(times[0] || null);

  React.useEffect(() => {
    if (times.length > 0 && !times.includes(selectedTime)) {
      setSelectedTime(times[0]);
    } else if (times.length === 0) {
      setSelectedTime(null);
    }
  }, [selectedDay, times]);

  const classes = [
    {
      id: '1',
      name: 'CROSSFIT - TRIANA',
      time: '07:00',
      attendees: [
        { id: 'u1', avatar: 'https://i.pravatar.cc/150?img=1', hasCheck: false, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'u2', avatar: 'https://i.pravatar.cc/150?img=2', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'u3', avatar: 'https://i.pravatar.cc/150?img=3', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'u4', avatar: 'https://i.pravatar.cc/150?img=4', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'u5', avatar: 'https://i.pravatar.cc/150?img=5', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'u6', avatar: 'https://i.pravatar.cc/150?img=6', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'u7', avatar: 'https://i.pravatar.cc/150?img=7', hasCheck: true, hasG: true, hasBookmark: false, isHighlighted: true },
        { id: 'u8', avatar: 'https://i.pravatar.cc/150?img=8', hasCheck: false, hasG: false, hasBookmark: true, isHighlighted: true },
        { id: 'u9', avatar: 'https://i.pravatar.cc/150?img=9', hasCheck: true, hasG: true, hasBookmark: false, isHighlighted: false },
      ],
    },
    {
      id: '2',
      name: 'OPEN BOX - TRIANA',
      time: '07:00',
      attendees: [
        { id: 'u10', avatar: 'https://i.pravatar.cc/150?img=10', hasCheck: true, hasG: false, hasBookmark: false, isHighlighted: false },
        { id: 'u11', avatar: 'https://i.pravatar.cc/150?img=11', hasCheck: false, hasG: false, hasBookmark: false, isHighlighted: false },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesome name="bars" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reservas</Text>
        <View style={styles.headerIcons}>
          <View>
            <MaterialCommunityIcons name="bomb" size={24} color="red" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
          <FontAwesome name="question-circle" size={24} color="white" style={{ marginLeft: 25, marginRight: 15 }} />
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} style={styles.profileImage} />
        </View>
      </View>

      {/* Date Selector */}
      <View style={styles.dateSelector}>
        <FontAwesome name="calendar" size={20} color="white" />
        <Text style={styles.dateText}>{getFormattedDate(selectedDay)}</Text>
        <View style={styles.dateIcons}>
          <FontAwesome name="hand-peace-o" size={20} color="white" style={{ marginRight: 10 }} />
          <MaterialCommunityIcons name="tune" size={20} color="white" />
        </View>
      </View>

      {/* Day Carousel */}
      <View style={styles.dayCarouselContainer}>
        <TouchableOpacity style={styles.arrowButton}>
          <FontAwesome name="chevron-left" size={20} color="white" />
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayCarousel}>
          {days.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.dayCard, selectedDay === day.fullDate && styles.selectedDay]}
              onPress={() => setSelectedDay(day.fullDate)}
            >
              <Text style={[styles.dayLabel, selectedDay === day.fullDate && styles.selectedDayLabel]}>{day.label}</Text>
              <Text style={[styles.dayDate, selectedDay === day.fullDate && styles.selectedDayDate]}>{day.date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.arrowButton}>
          <FontAwesome name="chevron-right" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Time Carousel */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeCarousel}>
        {times.map((time, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.timeSlot, selectedTime === time && styles.selectedTimeSlot]}
            onPress={() => setSelectedTime(time)}
          >
            <Text style={styles.timeText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Class List */}
      <ScrollView style={styles.classList}>
        {currentClasses.map((clase) => (
          <View key={clase.id} style={styles.classItem}>
            <View style={styles.classHeader}>
              <View style={styles.classTitleIndicator} />
              <Text style={styles.className}>{clase.name}</Text>
              <Text style={styles.classTimeText}>{clase.time}</Text>
            </View>
            {clase.attendees.length > 0 && (
              <View style={styles.mainAttendeeContainer}>
                <Image source={{ uri: clase.attendees[0].avatar }} style={styles.mainAttendeeAvatar} />
              </View>
            )}
            <View style={styles.attendeesContainer}>
              {clase.attendees.slice(1).map((attendee, index) => (
                <View key={index} style={[styles.attendeeWrapper, attendee.isHighlighted && styles.attendeeHighlighted]}>
                  <Image source={{ uri: attendee.avatar }} style={[styles.attendeeAvatar, attendee.hasCheck && styles.attendeeAvatarWithCheck]} />
                  {attendee.hasCheck && (
                    <View style={styles.checkIcon}>
                      <FontAwesome name="check" size={10} color="white" />
                    </View>
                  )}
                  {attendee.hasG && (
                    <View style={styles.gIcon}>
                      <Text style={styles.gText}>G</Text>
                    </View>
                  )}
                  {attendee.hasBookmark && (
                    <View style={styles.bookmarkIcon}>
                      <FontAwesome name="bookmark" size={12} color="white" />
                    </View>
                  )}
                </View>
              ))}
              {[...Array(Math.max(0, 9 - clase.attendees.slice(1).length))].map((_, index) => (
                <View key={`placeholder-${index}`} style={styles.attendeeAvatarPlaceholder} />
              ))}
            </View>
            <View style={styles.classButtons}>
              <TouchableOpacity style={styles.classButton} onPress={() => setWodModalVisible(true)}>
                <Text style={styles.classButtonText}>Wod</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.classButton}>
                <Text style={styles.classButtonText}>Finalizada</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.reserveButton}>
                <MaterialCommunityIcons name="human-greeting" size={16} color="white" />
                <Text style={styles.reserveButtonText}>Reservar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* WOD Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isWodModalVisible}
        onRequestClose={() => {
          setWodModalVisible(!isWodModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>WOD del Día</Text>
            <ScrollView style={styles.wodContentScroll}>
              <Text style={styles.wodText}>
                **WOD: "Murph"**

                For time: 
                1 mile Run
                100 Pull-ups
                200 Push-ups
                300 Squats
                1 mile Run

                *Partition the pull-ups, push-ups, and squats as needed. 
                Start and finish with a mile run. If you've got a 20# vest or body armor, wear it.*

                **Warm-up:**
                5 min light cardio
                2 rounds of:
                10 Scapular Pull-ups
                10 Push-up progressions
                10 Air Squats

                **Cool-down:**
                5 min stretching, focusing on shoulders, chest, and hips.
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setWodModalVisible(!isWodModalVisible)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1c1c1c',
    paddingTop: 40,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1c1c1c',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  dateText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  dateIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayCarouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#1c1c1c',
  },
  arrowButton: {
    padding: 10,
  },
  dayCarousel: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#1c1c1c',
  },
  dayCard: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDay: {
    backgroundColor: '#FFD700', // Amarillo para el día seleccionado
  },
  dayLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dayDate: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeCarousel: {
    height: 30,
    paddingVertical: 0,
    paddingHorizontal: 15,
    backgroundColor: '#1c1c1c',
    marginBottom: 0,
    flexGrow: 0,
    flexShrink: 0,
  },
  timeSlot: {
    backgroundColor: '#333',
    borderRadius: 8,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 3,
    marginRight: 10,
  },
  selectedTimeSlot: {
    backgroundColor: '#555',
  },
  timeText: {
    color: 'white',
    fontSize: 10,
    lineHeight: 10,
  },
  classList: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 0,
    marginTop: 0,
  },
  classItem: {
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
  },
  classHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  classTitleIndicator: {
    width: 8,
    height: '100%',
    backgroundColor: '#00BFFF', // Azul claro
    marginRight: 10,
    borderRadius: 2,
  },
  className: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  classTimeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  attendeesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    alignItems: 'center',
  },
  attendeeAvatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    margin: 5,
    borderWidth: 2,
    borderColor: 'green',
  },
  attendeeAvatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#555',
  },
  classButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  classButton: {
    backgroundColor: '#555',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  classButtonText: {
    color: 'white',
    fontSize: 14,
  },
  reserveButton: {
    backgroundColor: '#00BFFF', // Azul claro
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reserveButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  wodContentScroll: {
    maxHeight: 300,
  },
  wodText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00BFFF',
    padding: 15,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedDayLabel: {
    fontWeight: 'bold',
  },
  selectedDayDate: {
    fontWeight: 'bold',
  },
});

export default MainScreen; 