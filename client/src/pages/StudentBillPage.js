import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Table, Spinner, Alert, Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';

const StudentBillPage = () => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [studentId, setStudentId] = useState('');
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    if (year && month && studentId) {
      fetchBill(year, month, studentId);
    }
  }, [year, month, studentId]);

  const fetchBill = async (selectedYear, selectedMonth, selectedStudentId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/meals/get-specipic-student-bill/${selectedYear}/${selectedMonth}/${selectedStudentId}`
      );
      setBill(response.data);
    } catch (err) {
      setError('Failed to fetch bill');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Student_Bill_${studentId}_${month}_${year}`,
  });

  return (
    <Container>
      <Row className="my-4">
        <Col md={4}>
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
        <Col md={4}>
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
        <Col md={4}>
          <Form.Group controlId="formStudentId">
            <Form.Label>Student ID</Form.Label>
            <Form.Control
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter Student ID"
            />
          </Form.Group>
        </Col>
      </Row>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {bill && (
        <>
          <div ref={componentRef}>
            <h5>Monthly Bill for Student ID: {bill.studentId}</h5>
            <p>Total Bill: Taka {bill.totalBill.toFixed(2)}</p>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Breakfast</th>
                  <th>Lunch</th>
                  <th>Dinner</th>
                  <th>Day Total</th>
                </tr>
              </thead>
              <tbody>
                {bill.meals.map((meal, index) => (
                  <tr key={index}>
                    <td>{new Date(meal.date).toLocaleDateString()}</td>
                    <td>{meal.breakfast === 'yes' ? `Included (${meal.breakfastPrice})` : 'Not included'}</td>
                    <td>{meal.lunch === 'yes' ? `Included (${meal.lunchPrice})` : 'Not included'}</td>
                    <td>{meal.dinner === 'yes' ? `Included (${meal.dinnerPrice})` : 'Not included'}</td>
                    <td>Taka {meal.dailyTotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Button variant="primary" onClick={handlePrint} className="mt-3">
            Print Bill
          </Button>
        </>
      )}
    </Container>
  );
};

export default StudentBillPage;
