const NoteEditScreen = ({ route, navigation }) => {
  const { note, onSave } = route.params;

  const [title, setTitle] = useState(note.title);
  const [date, setDate] = useState(note.date);
  const [type, setType] = useState(note.type);
  const [priority, setPriority] = useState(note.priority);
  const [status, setStatus] = useState(note.status);

  const handleUpdate = () => {
    const updatedNote = {
      ...note,
      title,
      date,
      type,
      priority,
      status,
    };

    onSave(updatedNote);  // ⬅️ PERBAIKAN TERPENTING
    navigation.goBack();
  };
};
