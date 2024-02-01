import { Avatar, Card, Skeleton } from "antd";
import Title from "antd/es/typography/Title";
import ErrorUI from "../../components/ui/ErrorUI";
import usePageTitle from "../../hooks/usePageTitle";
import { useGetProfileQuery } from "../../redux/features/Auth/authApi";

const Profile = () => {
  const title = usePageTitle("Profile");
  const { data, isLoading, isError, error } = useGetProfileQuery(undefined);
  const user = data?.data;

  return (
    <>
      {title}
      {isLoading ? (
        <Skeleton active />
      ) : isError ? (
        <ErrorUI errorMessage={(error as any)?.data?.message} />
      ) : (
        <main>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card style={{ maxWidth: "100%", textAlign: "center" }}>
              <Avatar size={150} src={user?.avatar} />
              <div
                style={{
                  marginTop: "50px",
                }}
              >
                <Title style={{ marginBottom: "10px" }} level={3}>
                  {user?.name}
                </Title>
                <p style={{ marginTop: "0px" }}>Email: {user?.email}</p>
              </div>
            </Card>
          </div>
        </main>
      )}
    </>
  );
};

export default Profile;
