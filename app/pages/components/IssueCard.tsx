import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import Badge from 'react-bootstrap/Badge'
import { IssueProps } from '../../src/data/Interfaces'

class IssueCard extends React.Component<IssueProps> {
    render() {
        return (
            <Card className="PaddedCard">
                <Card.Body>
                    <Card.Header>
                        <Card.Title>{this.props.issue.name}</Card.Title>
                        <Card.Text>Last Updated: {this.props.issue.lastUpdated.toDateString()}</Card.Text>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className="PaddedTicketDesc">{this.props.issue.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Card.Link>{this.props.issue.repo}</Card.Link>
                        <Card.Text>
                        {
                            this.props.issue.labels ?
                                this.props.issue.labels.map((label: any) => {
                                    return <Badge key={label.id} pill variant="info">{label.name}</Badge>;
                                }) : ''
                        }
                        </Card.Text>
                    </Card.Footer>
                </Card.Body>
            </Card>
        )
    }
}

export default IssueCard;