import { Card, Col, Divider, Row, Skeleton, Tag } from "antd";
import { ReactNode } from "react";
import { useLocation, useParams } from "react-router-dom";
import BackButton from "../../components/ui/BackButton";
import ErrorUI from "../../components/ui/ErrorUI";
import usePageTitle from "../../hooks/usePageTitle";
import { useGetEyeglassDetailsQuery } from "../../redux/features/Eyeglasses/eyeglassApi";
import { TEyeglass } from "../../types/eyeglass.type";
import { capitalizeString } from "../../utils";

const EyeglassDetails = () => {
  const title = usePageTitle("Eyeglass Details");
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetEyeglassDetailsQuery(id);
  const eyeglass: TEyeglass = data?.data;

  const navigateTo = useLocation().state?.from || "/eyeglasses";

  return (
    <>
      {title}
      {isLoading ? (
        <Skeleton active />
      ) : isError ? (
        <ErrorUI errorMessage={(error as any)?.data?.message} />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginBottom: "20px",
            }}
          >
            <BackButton
              title={
                navigateTo === "/sales"
                  ? "Back to sales page"
                  : "Back to eyeglasses page"
              }
              to={navigateTo}
            />
          </div>
          <Row gutter={[16, 16]}>
            <Col
              xs={24}
              md={12}
              style={{ minHeight: "100%", overflow: "hidden" }}
            >
              <img
                src={eyeglass?.image}
                alt={eyeglass?.name}
                style={{ maxWidth: "100%", height: "100%" }}
              />
            </Col>
            <Col
              xs={24}
              md={12}
              style={{ fontWeight: 500, minHeight: "100%", overflow: "hidden" }}
            >
              <Card
                title={eyeglass?.name}
                bordered={false}
                style={{ minHeight: "100%" }}
              >
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
                  <strong>Frame Material:</strong>{" "}
                  {capitalizeString(eyeglass?.frameMaterial)}
                </p>
                <p>
                  <strong>Frame Shape:</strong>{" "}
                  {capitalizeString(eyeglass?.frameShape)}
                </p>
                <p>
                  <strong>Lens Type:</strong>{" "}
                  {capitalizeString(eyeglass?.lensType)}
                </p>
                <p>
                  <strong>Gender:</strong> {capitalizeString(eyeglass?.gender)}
                </p>
                <p>
                  <strong>Color:</strong> {capitalizeString(eyeglass?.color)}
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
        </>
      )}
    </>
  );
};

export default EyeglassDetails;
