import React from "react";
import { Card, Col, Container, ListGroup } from "react-bootstrap";

function Contactlist(contacts) {
  console.log(contacts);
  return (
    <div>
      <Container className="p-4">
        <Col md="4">
          <Card>
            <ListGroup variant="flush">
              <tbody>
                {contacts.contacts.map((contact) => (
                  <ListGroup.Item>
                    <tr key={contact._id} onClick={() => {}}>
                      <th scope="row">{contact.name}</th>
                      <td>{contact.address}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                    </tr>
                  </ListGroup.Item>
                ))}
              </tbody>
            </ListGroup>
          </Card>
        </Col>
      </Container>
    </div>
  );
}

export default { Contactlist };
