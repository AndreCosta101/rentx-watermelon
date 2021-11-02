import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, FlatList } from 'react-native';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsQuantity,
  AppointmentsTitle,
} from './styles';


interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
}

import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { useTheme } from 'styled-components';

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation<any>();
  const theme = useTheme();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get(`/schedules_byuser?user_id=1`)
        console.log(response.data)
        setCars(response.data)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
    fetchCars();
  }, []);

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton
          onPress={handleGoBack}
          color={theme.colors.shape}
        />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel.
        </Title>
        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>

      </Header>

      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos:</AppointmentsTitle>
          <AppointmentsQuantity>05</AppointmentsQuantity>
        </Appointments>

        <FlatList
          data={cars}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Car data={item.car} />
          )}
        />
      </Content>



    </Container>
  );
}