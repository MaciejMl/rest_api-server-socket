import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Progress, Alert } from 'reactstrap';
import {
  getSeats,
  loadSeatsRequest,
  getRequests,
} from '../../../redux/seatsRedux';
import './SeatChooser.scss';
import io from 'socket.io-client';

const SeatChooser = ({ chosenDay, chosenSeat, updateSeat }) => {
  const dispatch = useDispatch();
  const seats = useSelector(getSeats);
  const requests = useSelector(getRequests);
  // eslint-disable-next-line
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8000');
    setSocket(newSocket);

    newSocket.on('seatsUpdated', (data) => {
      dispatch(loadSeatsRequest(data));
    });

    return () => {
      newSocket.close();
    };
  }, [dispatch]);

  const isTaken = (seatId) => {
    const taken = seats.some(
      (item) => item.seat === seatId && item.day === chosenDay
    );
    return taken;
  };

  const countTakenSeats = () => {
    const takenSeats = seats.filter((item) => item.day === chosenDay);
    return takenSeats.length;
  };

  const prepareSeat = (seatId) => {
    if (seatId === chosenSeat)
      return (
        <Button key={seatId} className='seats__seat' color='primary'>
          {seatId}
        </Button>
      );
    else if (isTaken(seatId))
      return (
        <Button key={seatId} className='seats__seat' disabled color='secondary'>
          {seatId}
        </Button>
      );
    else
      return (
        <Button
          key={seatId}
          color='primary'
          className='seats__seat'
          outline
          onClick={(e) => updateSeat(e, seatId)}
        >
          {seatId}
        </Button>
      );
  };

  return (
    <div>
      <h3>Pick a seat</h3>
      <small id='pickHelp' className='form-text text-muted ml-2'>
        <Button color='secondary' /> – seat is already taken
      </small>
      <small id='pickHelpTwo' className='form-text text-muted ml-2 mb-4'>
        <Button outline color='primary' /> – it's empty
      </small>
      {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success && (
        <div className='seats'>
          {[...Array(50)].map((x, i) => prepareSeat(i + 1))}
        </div>
      )}
      <small id='pickHelpTwo' className='form-text text-muted ml-2 mb-4'>
        Free seats: {50 - countTakenSeats()} / 50
      </small>
      {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending && (
        <Progress animated color='primary' value={50} />
      )}
      {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error && (
        <Alert color='warning'>Couldn't load seats...</Alert>
      )}
    </div>
  );
};

export default SeatChooser;
