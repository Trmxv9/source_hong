const formatDate = (date: string | null): string | null => {
  if (date) {
    const [year] = date.split("-");
    return year;
  }

  return null;
};

export default formatDate;
