import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Table, Spinner, Alert, Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';

const BillingPage = () => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [bills, setBills] = useState(null);
  const [rozaBills, setRozaBills] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    if (year && month) {
      fetchBills(year, month);
      fetchRozaBills(year, month);
    }
  }, [year, month]);

  const fetchBills = async (selectedYear, selectedMonth) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/meals/get-student-bills/${selectedYear}/${selectedMonth}`);
      setBills(response.data);
    } catch (err) {
      setError('Failed to fetch bills');
    } finally {
      setLoading(false);
    }
  };
  const fetchRozaBills = async (selectedYear, selectedMonth) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/meals/get-roza-student-bills/${selectedYear}/${selectedMonth}`);
      setRozaBills(response.data);
    } catch (err) {
      setError('Failed to fetch Roza meal bills');
    } finally {
      setLoading(false);
    }
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Meals_Bill_Of_${year}_${month}`,
  });

  return (
    <Container>
      <Row className="my-4">
        <Col md={6}>
          <Form.Group controlId="formYear">
            <Form.Label>Select Year</Form.Label>
            <Form.Control
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="YYYY"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formMonth">
            <Form.Label>Select Month</Form.Label>
            <Form.Control
              as="select"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="">Select Month</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={String(i + 1).padStart(2, '0')}>
                  {new Date(0, i).toLocaleString('en-US', { month: 'long' })}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {bills || rozaBills ? (
        <>
          <div ref={componentRef}>
            {bills && (
              <div>
                <h4>Regular Meal Bills</h4>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Room No</th>
                      <th>Total Bill</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(bills).map(([id, { total, studentInfo }]) => (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{studentInfo.name}</td>
                        <td>{studentInfo.department}</td>
                        <td>{studentInfo.roomNo}</td>
                        <td>Taka: {total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
            {rozaBills && (
              <div>
                <h4>Roza Meal Bills</h4>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Room No</th>
                      <th>Total Bill Roza</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(rozaBills).map(([sid, { total, studentInfo }]) => (
                      <tr key={sid}>
                        <td>{sid}</td>
                        <td>{studentInfo.name}</td>
                        <td>{studentInfo.department}</td>
                        <td>{studentInfo.roomNo}</td>
                        <td>Taka: {total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
          <Button variant="primary" onClick={handlePrint} className="mt-3">
            Print Bill
          </Button>
        </>
      ) : (
        <p>No bills available for the selected year and month.</p>
      )}

    </Container>
  );
};

export default BillingPage;
