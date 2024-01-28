import { Card, Col, Divider, Row, Skeleton, Tag } from "antd";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import ErrorUI from "../../components/ui/ErrorUI";
import { useGetEyeglassDetailsQuery } from "../../redux/features/Eyeglasses/eyeglassApi";
import { TEyeglass } from "../../types/eyeglass.type";

const EyeglassDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetEyeglassDetailsQuery(id);
  const eyeglass: TEyeglass = data?.data;

  return isLoading ? (
    <Skeleton />
  ) : isError ? (
    <ErrorUI errorMessage={(error as any)?.data?.message} />
  ) : (
    <Row gutter={16}>
      <Col span={12}>
        <img
          src={eyeglass?.image}
          alt={eyeglass?.name}
          style={{ maxWidth: "100%", height: "450px" }}
        />
      </Col>
      <Col span={12} style={{ fontWeight: 500 }}>
        <Card title={eyeglass?.name} bordered={false}>
          <p>
            <strong>Brand:</strong> {eyeglass?.brand}
          </p>
          <p>
            <strong>Price:</strong> ${eyeglass?.price}
          </p>
          <p>
            <strong>Quantity:</strong> {eyeglass?.quantity}
          </p>
          <Divider />
          <p>
            <strong>Frame Material:</strong> {eyeglass?.frameMaterial}
          </p>
          <p>
            <strong>Frame Shape:</strong> {eyeglass?.frameShape}
          </p>
          <p>
            <strong>Lens Type:</strong> {eyeglass?.lensType}
          </p>
          <p>
            <strong>Gender:</strong> {eyeglass?.gender}
          </p>
          <p>
            <strong>Color:</strong> {eyeglass?.color}
          </p>

          {eyeglass?.otherRelevantAttributes && (
            <>
              <Divider />
              <p>
                <strong>Other Attributes:</strong>
              </p>
              <ul style={{ listStyle: "none" }}>
                {Object.entries(eyeglass?.otherRelevantAttributes)?.map(
                  ([key, value]) => (
                    <li key={key}>
                      <Tag>
                        {key} : {value as ReactNode}
                      </Tag>
                    </li>
                  )
                )}
              </ul>
            </>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default EyeglassDetails;
