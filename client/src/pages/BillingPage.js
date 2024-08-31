import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Table, Spinner, Alert } from 'react-bootstrap';

const BillingPage = () => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [bills, setBills] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (year && month) {
      fetchBills(year, month);
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
      {bills && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Total Bill</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(bills).map(([sid, { total, studentInfo }]) => (
              <tr key={sid}>
                <td>{sid}</td>
                <td>{studentInfo.name}</td>
                <td>{studentInfo.department}</td>
                <td>${total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default BillingPage;
