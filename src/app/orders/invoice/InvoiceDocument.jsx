// InvoiceDocument.js
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer"; // Import necessary components

const InvoiceDocument = ({ invoice }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: "Helvetica",
    },
    section: {
      marginBottom: 10,
    },
    text: {
      fontSize: 12,
    },
    boldText: {
      fontSize: 14,
      fontWeight: "bold",
    },
    image: {
      width: 150,
      height: 150,
      marginBottom: 10,
    },
    container: {
      marginBottom: 20,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Client Info */}
          <Text style={styles.boldText}>Client Information:</Text>
          <Text style={styles.text}>
            Name: {invoice?.user?.fname} {invoice?.user?.lname}
          </Text>
          <Text style={styles.text}>Email: {invoice?.user?.email}</Text>
          <Text style={styles.text}>Phone: {invoice?.user?.phone}</Text>
          <Text style={styles.text}>Address: {invoice?.user?.address}</Text>

          {/* Invoice Info */}
          <Text style={styles.boldText}>Invoice Details:</Text>
          <Text style={styles.text}>
            Invoice Number: {invoice?.transaction?.invoice_num}
          </Text>
          <Text style={styles.text}>
            Amount: {invoice?.transaction?.amount}
          </Text>
          <Text style={styles.text}>
            Issue Date:{" "}
            {new Date(invoice?.transaction?.issue_date).toLocaleDateString()}
          </Text>
          <Text style={styles.text}>
            Expire Date:{" "}
            {new Date(invoice?.transaction?.expirey_date).toLocaleDateString()}
          </Text>

          {/* Auction Info */}
          <Text style={styles.boldText}>Auction Details:</Text>
          <Text style={styles.text}>
            Auction Name: {invoice?.auction?.name}
          </Text>
          <Text style={styles.text}>
            Auctioneer: {invoice?.auction?.auctioneer}
          </Text>

          {/* Lot Info */}
          <Text style={styles.boldText}>Lot Details:</Text>
          <Text style={styles.text}>Lot Name: {invoice?.lot?.name}</Text>
          <Text style={styles.text}>Price: {invoice?.lot?.price}</Text>
          <Text style={styles.text}>
            Description: {invoice?.lot?.additionalinfo}
          </Text>

          {/* Images */}
          {invoice?.lot?.images?.map((img, index) => (
            <Image key={index} style={styles.image} src={img} />
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
