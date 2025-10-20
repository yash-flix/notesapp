import { useState, useEffect } from "react";
import {
  Button,
  Heading,
  Flex,
  View,
  Grid,
  Divider,
  Card,
  TextField,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { uploadData, getUrl, remove } from "aws-amplify/storage";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

const client = generateClient();

export default function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const { data: notes } = await client.models.Note.list();
    await Promise.all(
      notes.map(async (note) => {
        if (note.image) {
          const linkToStorageFile = await getUrl({
            path: ({ identityId }) => `media/${identityId}/${note.image}`,
          });
          note.image = linkToStorageFile.url;
        }
        return note;
      })
    );
    setNotes(notes);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: form.get("image").name,
    };

    if (!!data.image) {
      await uploadData({
        path: ({ identityId }) => `media/${identityId}/${data.image}`,
        data: form.get("image"),
      }).result;
    }

    await client.models.Note.create(data);
    fetchNotes();
    event.target.reset();
  }

  async function deleteNote({ id }) {
    await client.models.Note.delete({ id });
    fetchNotes();
  }

  return (
    <Authenticator>
      {({ signOut }) => (
        <View style={styles.container}>
          <Flex
            direction="column"
            alignItems="center"
            style={styles.mainContent}
          >
            {/* Header */}
            <Flex
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              style={styles.header}
            >
              <Heading level={1} style={styles.title}>
                📝 Ink
              </Heading>
              <Button onClick={signOut} variation="link" style={styles.signOutBtn}>
                Sign Out
              </Button>
            </Flex>

            {/* Create Note Form */}
            <Card variation="elevated" style={styles.formCard}>
              <View as="form" onSubmit={createNote}>
                <Flex direction="column" gap="1.5rem">
                  <Heading level={3} style={styles.formTitle}>
                    Create New Note
                  </Heading>
                  
                  <input
                    name="name"
                    placeholder="Note Name"
                    type="text"
                    required
                    style={styles.input}
                  />
                  
                  <textarea
                    name="description"
                    placeholder="Note Description"
                    required
                    rows="4"
                    style={styles.textarea}
                  />
                  
                  <View style={styles.fileInputWrapper}>
                    <label style={styles.fileLabel}>
                      📎 Attach Image (Optional)
                    </label>
                    <input
                      name="image"
                      type="file"
                      accept="image/png, image/jpeg"
                      style={styles.fileInput}
                    />
                  </View>

                  <Button type="submit" variation="primary" style={styles.submitBtn}>
                    Create Note
                  </Button>
                </Flex>
              </View>
            </Card>

            <Divider style={styles.divider} />

            {/* Notes Grid */}
            <View style={styles.notesSection}>
              <Heading level={2} style={styles.notesTitle}>
                Your Notes ({notes.length})
              </Heading>
              
              {notes.length === 0 ? (
                <View style={styles.emptyState}>
                  <p style={styles.emptyText}>No notes yet. Create your first note above! 🚀</p>
                </View>
              ) : (
                <Grid
                  templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                  gap="2rem"
                  style={styles.notesGrid}
                >
                  {notes.map((note) => (
                    <Card
                      key={note.id || note.name}
                      variation="elevated"
                      style={styles.noteCard}
                    >
                      {note.image && (
                        <View style={styles.imageWrapper}>
                          <img
                            src={note.image}
                            alt={`visual aid for ${note.name}`}
                            style={styles.noteImage}
                          />
                        </View>
                      )}
                      
                      <Flex direction="column" gap="1rem" style={styles.noteContent}>
                        <Heading level={4} style={styles.noteName}>
                          {note.name}
                        </Heading>
                        
                        <p style={styles.noteDescription}>{note.description}</p>
                        
                        <Button
                          variation="destructive"
                          onClick={() => deleteNote(note)}
                          style={styles.deleteBtn}
                        >
                          🗑️ Delete
                        </Button>
                      </Flex>
                    </Card>
                  ))}
                </Grid>
              )}
            </View>
          </Flex>
        </View>
      )}
    </Authenticator>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f5f5f5",
    padding: "2rem",
  },
  mainContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  header: {
    backgroundColor: "white",
    padding: "1.5rem 2rem",
    borderRadius: "8px",
    marginBottom: "2rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e5e5",
  },
  title: {
    margin: 0,
    color: "#171717",
    fontSize: "2rem",
    fontWeight: "600",
    letterSpacing: "-0.02em",
  },
  signOutBtn: {
    color: "#525252",
    fontWeight: "500",
  },
  formCard: {
    width: "100%",
    padding: "2rem",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e5e5",
  },
  formTitle: {
    color: "#171717",
    marginBottom: "0.5rem",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "0.875rem 1rem",
    fontSize: "1rem",
    border: "1px solid #d4d4d4",
    borderRadius: "6px",
    outline: "none",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    backgroundColor: "white",
  },
  textarea: {
    width: "100%",
    padding: "0.875rem 1rem",
    fontSize: "1rem",
    border: "1px solid #d4d4d4",
    borderRadius: "6px",
    outline: "none",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    resize: "vertical",
    backgroundColor: "white",
  },
  fileInputWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  fileLabel: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#525252",
  },
  fileInput: {
    fontSize: "0.875rem",
    padding: "0.5rem",
  },
  submitBtn: {
    fontSize: "1rem",
    fontWeight: "500",
    padding: "0.875rem",
    borderRadius: "6px",
    transition: "all 0.2s ease",
    backgroundColor: "#171717",
    color: "white",
  },
  divider: {
    margin: "3rem 0",
    backgroundColor: "#d4d4d4",
  },
  notesSection: {
    width: "100%",
  },
  notesTitle: {
    color: "#171717",
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "1.75rem",
    fontWeight: "600",
    letterSpacing: "-0.02em",
  },
  emptyState: {
    backgroundColor: "white",
    padding: "3rem",
    borderRadius: "8px",
    textAlign: "center",
    border: "1px solid #e5e5e5",
  },
  emptyText: {
    fontSize: "1.125rem",
    color: "#737373",
    margin: 0,
  },
  notesGrid: {
    width: "100%",
  },
  noteCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    transition: "all 0.2s ease",
    cursor: "pointer",
    border: "1px solid #e5e5e5",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  imageWrapper: {
    width: "100%",
    height: "200px",
    overflow: "hidden",
    backgroundColor: "#fafafa",
  },
  noteImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  noteContent: {
    padding: "1.5rem",
    flex: 1,
  },
  noteName: {
    color: "#171717",
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: "600",
    letterSpacing: "-0.01em",
  },
  noteDescription: {
    color: "#525252",
    margin: 0,
    lineHeight: "1.6",
    flex: 1,
  },
  deleteBtn: {
    fontSize: "0.875rem",
    fontWeight: "500",
    borderRadius: "6px",
  },
};