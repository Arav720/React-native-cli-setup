import apiClient from '../apiClient';

// Fetch buses based on route and date
export const fetchBuses = async (from: string, to: string, date: string) => {
  try {
    const { data } = await apiClient.post('/bus/search', { from, to, date });
    return data?.data || [];
  } catch (error) {
    console.error('Error fetching buses:', error);
    return [];
  }
};

// Fetch detailed info for a specific bus
export const fetchBusDetails = async (busId: string) => {
  try {
    const { data } = await apiClient.get(`/bus/${busId}`);
    return data?.data || {};
  } catch (error) {
    console.error('Error fetching bus details:', error);
    return {};
  }
};

// Book a ticket for selected seats
export const bookTicket = async ({
  busId,
  date,
  seatNumbers,
}: {
  busId: string;
  date: string;
  seatNumbers: number[];
}) => {
  try {
    const { data } = await apiClient.post('/ticket/book', {
      busId,
      date,
      seatNumbers,
    });
    return data?.ticket;
  } catch (error) {
    console.error('Error booking ticket:', error);
    return null;
  }
};

// Fetch all tickets for the logged-in user
export const fetchUserTickets = async () => {
  try {
    const { data } = await apiClient.get('/ticket/user');
    return data?.tickets || [];
  } catch (error) {
    console.error('Error fetching user tickets:', error);
    return [];
  }
};
