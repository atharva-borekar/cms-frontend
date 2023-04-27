import { Card, Col, Row } from "react-bootstrap";

interface IInsightsProps {
  lengthAll?: number;
  lengthCertificates?: number;
  lengthCsr?: number;
  lengthExpired?: number;
  lengthNearExpiry?: number;
}

interface IInsightCardProps {
  value?: number | string;
  title?: string;
  color?: string;
  link?: string;
}

const InsightCard = (props: IInsightCardProps) => {
  const { title, value, color, link } = props;
  return (
    <Card onClick={() => window.location.replace(`home#${link}`)}>
      <Card.Header as="h5" className={`bg-${color} text-light`}>
        {title}
      </Card.Header>
      <Card.Body>
        <strong>{value}</strong>
      </Card.Body>
    </Card>
  );
};

const Insights = (props: IInsightsProps) => {
  const {
    lengthAll,
    lengthCertificates,
    lengthCsr,
    lengthExpired,
    lengthNearExpiry,
  } = props;
  return (
    <Row className="my-3">
      <Col>
        <InsightCard
          value={`Total: ${lengthAll} (Certificates:${lengthCertificates}, CSR: ${lengthCsr})`}
          title="All Certificates"
          color="success"
          link="all"
        />
      </Col>
      <Col>
        <InsightCard
          value={lengthNearExpiry}
          title="Near Expiry Certificates (< 5 days)"
          color="warning"
          link="expired"
        />
      </Col>
      <Col>
        <InsightCard
          value={lengthExpired}
          title="Expired Certificates"
          color="danger"
          link="near_expiry"
        />
      </Col>
    </Row>
  );
};
export default Insights;
