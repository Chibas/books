import { render, screen, fireEvent } from "@testing-library/react"
import BooksList from "../components/booksList";

const mockData = [
  {
    "id": "872179f2-4de2-4cde-a259-ee470d83d515",
    "cover": "https:\/\/picsum.photos\/id\/1001\/640\/480",
    "isbn": "9781593275846",
    "title": "Eloquent JavaScript, Second Edition",
    "subtitle": "A Modern Introduction to Programming",
    "author": "Mrs. John Doe",
    "published": "2014-12-14T00:00:00.000Z",
    "publisher": "No Starch Press",
    "pages": 472,
    "description": "JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
    "website": "http://eloquentjavascript.net/"
  },
  {
    "id": "89cae71c-fbe5-445c-8299-6de7a88ea5ab",
    "cover": "https:\/\/picsum.photos\/id\/1002\/640\/480",
    "isbn": "9781449331818",
    "title": "Learning JavaScript Design Patterns",
    "subtitle": "A JavaScript and jQuery Developer's Guide",
    "author": "Prof. John Doe",
    "published": "2012-07-01T00:00:00.000Z",
    "publisher": "O'Reilly Media",
    "pages": 254,
    "description": "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.",
    "website": "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/"
  }
];

describe("Books list component", () => {
  it("should show a message when no books are available", () => {
    render(<BooksList books={[]} />);
    const message = screen.getByText(/No books availabe at this time/i);
    expect(message).toBeInTheDocument();
  });
  describe("Renders correct information", () => {
    it("should render book\'s title", () => {
      render(<BooksList books={mockData} />);
      const title = screen.getByText(mockData[0].title);
      expect(title).toBeInTheDocument();
    });
    it("should render author name", () => {
      render(<BooksList books={mockData} />);
      const title = screen.getByText(mockData[0].author);
      expect(title).toBeInTheDocument();
    });
    it("should render cover image", () => {
      render(<BooksList books={mockData} />);
      const image = screen.getByAltText(mockData[0].title);
      expect(image.src).toContain(mockData[0].cover);
    });
    it("should render More Information link", async () => {
      render(<BooksList books={mockData} />);
      const button = screen.getAllByTestId('more-button')[0];
      fireEvent.mouseOver(button);
      expect(
        await screen.findByText(/More Information/i)
      ).toBeInTheDocument();
    })
  })
});
