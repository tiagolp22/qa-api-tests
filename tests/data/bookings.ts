export const credentials = {
  username: 'admin',
  password: 'password123',
};

export const newBooking = {
  firstname: 'Jean',
  lastname: 'Tremblay',
  totalprice: 180,
  depositpaid: true,
  bookingdates: {
    checkin: '2025-09-01',
    checkout: '2025-09-07',
  },
  additionalneeds: 'Breakfast',
};

export const updatedBooking = {
  firstname: 'Marie',
  lastname: 'Gagnon',
  totalprice: 220,
  depositpaid: false,
  bookingdates: {
    checkin: '2025-10-10',
    checkout: '2025-10-15',
  },
  additionalneeds: 'Late checkout',
};
