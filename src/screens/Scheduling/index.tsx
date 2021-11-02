import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps,
} from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  DateValueContainer,
  Content,
  Footer,
} from './styles';

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);

  const theme = useTheme();
  const navigation = useNavigation<any>();

  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails')
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleDateChange(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval)
  }

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        translucent
        backgroundColor='transparent'
      />
      <Header>
        <BackButton
          onPress={handleGoBack}
          color={theme.colors.shape}
        />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel.
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValueContainer selected={false}>
              <DateValue></DateValue>
            </DateValueContainer>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValueContainer selected={false}>
              <DateValue></DateValue>
            </DateValueContainer>

          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          onDayPress={handleDateChange}
          markedDates={markedDates}
        />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container >
  )
}