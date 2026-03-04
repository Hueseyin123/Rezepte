//Lädt rezepte einer kategori, zeigt bewertungen und inklusive durschnitt und pagination an

import { gql } from "@apollo/client";
import { useQuery, useApolloClient } from "@apollo/client/react";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";





const Get_Rezeptes = gql`
  query GetRezepte($id: ID!) {
    category(documentId: $id) {
      documentId
      rezeptes {
        documentId
        RezeptNamen
        Rezept
      }
      name
    }
  }
`;
const getDurchschnittProRezept = gql`
  query GetDurchschnittProRezept($rezeptId: ID!) {
    bewertungAggregate(rezeptId: $rezeptId) {
      avg {
        bewertung
      }
      count
    }
  }
`;
const showBewertungenProRezept = gql`
  query GetBewertungenProRezept($rezeptId: ID!, $page: Int!) {
    bewertungen_connection(
      pagination: { pageSize: 3, page: $page }
      filters: { rezepte: { documentId: { eq: $rezeptId } } }
    ) {
      nodes {
        documentId
        bewertung_text
        bewertung
        name
        rezepte {
          documentId
          RezeptNamen
        }
      }
      pageInfo {
        page
        pageSize
        pageCount
        total
      }
    }
  }
`;
const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));
const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};
function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}
IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};
function Reeptmitbewertunge({ rezept, neuerBewertungTrigger }) {
  const [page, setPage] = useState(1);
  const { data: durchschnittsData, refetch: refetchDurchschnitt } = useQuery(
    getDurchschnittProRezept,
    {
      variables: { rezeptId: rezept.documentId },
      fetchPolicy: "cache-and-network",
    },
  );
  const {
    data,
    previousData,
    loading,
    error,
    refetch: refetchBewertungen,
  } = useQuery(showBewertungenProRezept, {
    variables: { rezeptId: rezept.documentId, page: 1 },
    fetchPolicy: "cache-and-network",
  });
  useEffect(() => {
    refetchDurchschnitt();
    refetchBewertungen();
  }, [neuerBewertungTrigger]);
  if (loading && !data) return <div>Lade Bewertungen...</div>;
  if (error) return <div>Fehler beim Laden der Bewertungen</div>;
  const effectiveData = data ?? previousData;
  const bewertungen = effectiveData?.bewertungen_connection?.nodes || [];
  const pageInfo = effectiveData?.bewertungen_connection?.pageInfo;
  const durchschnittsBewertung =
    durchschnittsData?.bewertungAggregate?.avg?.bewertung || 0;
  const gesamtAnzahl = pageInfo?.total || 0;
  const handlePageChange = (_, value) => {
    setPage(value);
    refetchBewertungen({ rezeptId: rezept.documentId, page: value });
  };
  return (
    <div
      style={{
        marginBottom: "40px",
        borderBottom: "2px solid rgba(255,255,255,0.2)",
        paddingBottom: "30px",
      }}
    >
      <h4 style={{ paddingLeft: "63%", marginBottom: "5px" }}>
        {rezept.RezeptNamen}:{" "}
      </h4>
      <p style={{ paddingLeft: "70%", margin: "0" }}>
        <strong>Bewertungen: </strong>
        {gesamtAnzahl} {gesamtAnzahl === 1 ? "Bewertung" : "Bewertungen"}
      </p>
      <p
        style={{
          paddingLeft: "70%",
          marginTop: "0",
          marginBottom: "15px",
        }}
      >
        <strong>Durchschnittliche Bewertung: </strong>
        {durchschnittsBewertung.toFixed(1)} / 5
      </p>
      <h2>{rezept.RezeptNamen}</h2>
      <pre>{rezept.Rezept}</pre>
      <h3 style={{ marginTop: "30px" }}>
        Bewertungen für {rezept.RezeptNamen}:
      </h3>
      {bewertungen.length > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              padding: "10px 0",
              marginBottom: "16px",
              borderBottom: "1px solid rgba(255,255,255,0.15)",
            }}
          >
          
          </div>
          {bewertungen.map((bewertung, index) => (
            <div
              key={bewertung.documentId || index}
              style={{
                padding: "15px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            >
              <Card sx={{ minWidth: 275, background: "", boxShadow: "none" }}>
                <CardContent>
                  <StyledRating
                    size="small"
                    name="highlight-selected-only"
                    IconContainerComponent={IconContainer}
                    highlightSelectedOnly
                    value={bewertung.bewertung}
                    readOnly
                  />
                  <Typography variant="h5" component="div">
                    {bewertung.name}
                  </Typography>
                  <Typography
                    marginTop={2}
                    variant="body2"
                    color="text.secondary"
                  >
                    {bewertung.bewertung_text}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
          {(pageInfo?.pageCount || 1) > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "8px",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                marginTop: "8px",
              }}
            >

              <Pagination
                page={page}
                count={pageInfo?.pageCount || 1}
                onChange={handlePageChange}
                color="primary"
                size="small"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "rgba(255,255,255,0.7)",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "rgba(255,255,255,0.2) !important",
                    color: "#fff",
                  },
                }}
                
              />
                           
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", textAlign: "center", marginTop: "4px" }}>
              Seite {page} von {pageInfo?.pageCount}
            </Typography>

            </div>

          )}
        </>
      ) : (
        <p style={{ color: "rgba(255,255,255,0.6)" }}>
          Noch keine Bewertungen für dieses Rezept.
        </p>
      )}
    </div>
  );
}
export default function ReviewPage() {
  const { id } = useParams();
  const {data: kategorieData,loading: ladeKategorie,error: fehlerKategorie,} = useQuery(Get_Rezeptes, { variables: { id } });
  const [name, setName] = useState("");
  const [sterneBewertung, setSterneBewertung] = useState(0);
  const [bewertungsText, setBewertungsText] = useState("");
  const [ausgewaehlterRezept, setAusgewaehlterRezept] = useState(null);
  const [neuerBewertungTrigger, setNeuerBewertungTrigger] = useState(0);
  useEffect(() => {
    if (kategorieData?.category?.rezeptes?.length > 0 && !ausgewaehlterRezept) {
      setAusgewaehlterRezept(kategorieData.category.rezeptes[0]);
    }
  }, [kategorieData, ausgewaehlterRezept]);
  if (ladeKategorie) return <div>Loading...</div>;
  if (fehlerKategorie) return <div>Error: {fehlerKategorie.message}</div>;
  const sendeBewertung = async (e) => {
    e.preventDefault();
    const Datensortierung = {
      data: {
        name: name,
        bewertung: sterneBewertung,
        bewertung_text: bewertungsText,
        rezepte: {
          connect: [{ documentId: ausgewaehlterRezept.documentId }],
        },
      },
    };
    try {
      const postAntwort = await fetch("http://localhost:1337/api/bewertungen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Datensortierung),
      });
      if (!postAntwort.ok) {
        alert("Fehler beim Senden der Bewertung");
        return;
      }
      setName("");
      setSterneBewertung(0);
      setBewertungsText("");
      setNeuerBewertungTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Fehler beim Senden der Bewertung:", error);
    }
  };
  return (
    <div className="B1">
      <div style={{ flex: 1 }}>
        <div className="text-content">
          <h1>{kategorieData.category.name}</h1>
          {kategorieData.category.rezeptes.map((rezept) => (
            <Reeptmitbewertunge
              key={rezept.documentId}
              rezept={rezept}
              neuerBewertungTrigger={neuerBewertungTrigger}
            />
          ))}
        </div>
      </div>
      <div className="form-content">
        <h3>Bewertung schreiben</h3>
        <form onSubmit={sendeBewertung}>
          <input
            type="text"
            placeholder="Dein Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "420px",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "none",
              boxSizing: "border-box",
            }}
          />
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                fontSize: "14px",
                marginBottom: "5px",
                display: "block",
              }}
            >

              Rezept auswählen:
            </label>
            <select
              value={ausgewaehlterRezept?.documentId || ""}
              onChange={(e) => {
                const rezept = kategorieData.category.rezeptes.find(
                  (r) => r.documentId === e.target.value,
                );
                setAusgewaehlterRezept(rezept);
              }}
              required
              style={{
                width: "420px",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                boxSizing: "border-box",
                cursor: "pointer",
              }}
            >
              {kategorieData.category.rezeptes.map((rezept) => (
                <option key={rezept.documentId} value={rezept.documentId}>
                  {rezept.RezeptNamen}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <StyledRating
              name="highlight-selected-only"
              defaultValue={3}
              IconContainerComponent={IconContainer}
              getLabelText={(value) => customIcons[value].label}
              highlightSelectedOnly
              onChange={(event, value) => setSterneBewertung(value)}
            />
          </div>
          <textarea
            placeholder="Deine Bewertung..."
            value={bewertungsText}
            onChange={(e) => setBewertungsText(e.target.value)}
            required
            style={{
              width: "420px",
              padding: "10px",
              borderRadius: "5px",
              minHeight: "80px",
              border: "none",
              boxSizing: "border-box",
            }}
          />
          <button
            type="submit"
            className="submit-button"
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              background: "gold",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100%",
            }}
          >
            Bewertung senden
          </button>
        </form>
      </div>
    </div>
  );
}
