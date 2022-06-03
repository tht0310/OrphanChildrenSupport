import * as React from "react";
import { FC, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button, Col, Dropdown, Menu, Popover, Row, Space } from "antd";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  BorderHorizontalOutlined,
  BorderVerticleOutlined,
  ClearOutlined,
  CodeOutlined,
  DeleteOutlined,
  EnterOutlined,
  HighlightOutlined,
  InsertRowLeftOutlined,
  InsertRowRightOutlined,
  ItalicOutlined,
  LinkOutlined,
  MenuOutlined,
  MergeCellsOutlined,
  OrderedListOutlined,
  PlusOutlined,
  RedoOutlined,
  SplitCellsOutlined,
  StrikethroughOutlined,
  TableOutlined,
  UnderlineOutlined,
  UndoOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Search from "antd/lib/input/Search";
// const JoditEditor = React.lazy(() => {
//   return import("jodit-react");
// });
interface OnChangeHandler {
  (e: any): void;
}

type Props = {
  value?: string | number;
  defaultValue?: string | number;
  onChange?: OnChangeHandler;
  editable?: boolean;
  readingMode?: boolean;
};

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: (element) => {
          return {
            backgroundColor: element.getAttribute("data-background-color"),
          };
        },
        renderHTML: (attributes) => {
          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

const MenuBar = ({ editor }) => {
  const [link, setLink] = useState<string>("");

  if (!editor) {
    return null;
  }

  const tableMenus = (
    <Menu>
      <Menu.Item key="0">
        <Button
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          icon={<PlusOutlined />}
          block
          title="Thêm bảng"
        />
      </Menu.Item>
      <Menu.Item>
        <Space>
          <Button
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            disabled={!editor.can().addColumnBefore()}
            icon={<InsertRowLeftOutlined />}
            title="Thêm 1 cột bên trái"
          />
          <Button
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            disabled={!editor.can().addColumnAfter()}
            icon={<InsertRowRightOutlined />}
            title="Thêm 1 cột bên phải"
          />

          <Button
            onClick={() => editor.chain().focus().deleteColumn().run()}
            disabled={!editor.can().deleteColumn()}
            icon={<BorderHorizontalOutlined />}
            title="Xóa cột"
          />
        </Space>
      </Menu.Item>
      <Menu.Item>
        <Space>
          <Button
            onClick={() => editor.chain().focus().addRowBefore().run()}
            disabled={!editor.can().addRowBefore()}
            icon={<InsertRowLeftOutlined />}
            title="Thêm 1 hàng bên trên"
          />
          <Button
            onClick={() => editor.chain().focus().addRowAfter().run()}
            disabled={!editor.can().addRowAfter()}
            icon={<InsertRowRightOutlined />}
            title="Thêm 1 hàng bên dưới"
          />
          <Button
            onClick={() => editor.chain().focus().deleteRow().run()}
            disabled={!editor.can().deleteRow()}
            icon={<BorderVerticleOutlined />}
            title="Xóa hàng"
          />
        </Space>
      </Menu.Item>
      <Menu.Item>
        <Space>
          <Button
            onClick={() => editor.chain().focus().mergeCells().run()}
            disabled={!editor.can().mergeCells()}
            icon={<MergeCellsOutlined />}
            title="Ghép ô"
          />
          <Button
            onClick={() => editor.chain().focus().splitCell().run()}
            disabled={!editor.can().splitCell()}
            icon={<SplitCellsOutlined />}
            title="Tách ô"
          />
          <Button
            onClick={() => editor.chain().focus().deleteTable().run()}
            disabled={!editor.can().deleteTable()}
            icon={<DeleteOutlined />}
            title="Xóa bảng"
          />
        </Space>
      </Menu.Item>
    </Menu>
  );

  const importLink = () => {
    function onAddLink(value: string) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: value })
        .run();
    }

    return (
      <div>
        <Search
          placeholder="Nhập link"
          onSearch={onAddLink}
          style={{ width: 300 }}
          enterButton={<PlusOutlined />}
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        {editor.isActive("link") && (
          <Button
            onClick={() => {
              editor.chain().focus().unsetLink().run();
            }}
            style={{ marginLeft: 10 }}
            icon={<DeleteOutlined />}
          />
        )}
      </div>
    );
  };

  return (
    <div className="text-editor-menu">
      <Row gutter={12}>
        <Col className="button-group">
          <Button
            onClick={() => editor.chain().focus().setParagraph().run()}
            type={editor.isActive("paragraph") ? "primary" : "default"}
          >
            Paragraph
          </Button>
          <Button
            className="heading-btn"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            type={
              editor.isActive("heading", { level: 1 }) ? "primary" : "default"
            }
          >
            H1
          </Button>
          <Button
            className="heading-btn"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            type={
              editor.isActive("heading", { level: 2 }) ? "primary" : "default"
            }
          >
            H2
          </Button>
          <Button
            className="heading-btn"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            type={
              editor.isActive("heading", { level: 3 }) ? "primary" : "default"
            }
          >
            H3
          </Button>
          <Button
            className="heading-btn"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            type={
              editor.isActive("heading", { level: 4 }) ? "primary" : "default"
            }
          >
            H4
          </Button>
          <Button
            className="heading-btn"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            type={
              editor.isActive("heading", { level: 5 }) ? "primary" : "default"
            }
          >
            H5
          </Button>
          <Button
            className="heading-btn"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            type={
              editor.isActive("heading", { level: 6 }) ? "primary" : "default"
            }
          >
            H6
          </Button>

          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            type={editor.isActive("bold") ? "primary" : "default"}
            icon={<BoldOutlined />}
            title="In đậm"
          />
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            type={editor.isActive("italic") ? "primary" : "default"}
            icon={<ItalicOutlined />}
            title="In nghiêng"
          />
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            type={editor.isActive("strike") ? "primary" : "default"}
            icon={<StrikethroughOutlined />}
            title="Strike"
          />
          <Button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            type={editor.isActive("highlight") ? "primary" : "default"}
            icon={<HighlightOutlined />}
            title="Highlight"
          />
          <Button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            type={editor.isActive("underline") ? "primary" : "default"}
            icon={<UnderlineOutlined />}
            title="Highlight"
          />

          <Button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            type={
              editor.isActive({ textAlign: "left" }) ? "primary" : "default"
            }
            icon={<AlignLeftOutlined />}
            title="Căn trái"
          />
          <Button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            type={
              editor.isActive({ textAlign: "center" }) ? "primary" : "default"
            }
            icon={<AlignCenterOutlined />}
            title="Căn trái"
          />
          <Button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            type={
              editor.isActive({ textAlign: "right" }) ? "primary" : "default"
            }
            icon={<AlignRightOutlined />}
            title="Căn phải"
          />
          <Button
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            type={
              editor.isActive({ textAlign: "justify" }) ? "primary" : "default"
            }
            icon={<MenuOutlined />}
            title="Căn đều"
          />

          <Button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            type={editor.isActive("bulletList") ? "primary" : "default"}
            icon={<UnorderedListOutlined />}
          />
          <Button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            type={editor.isActive("orderedList") ? "primary" : "default"}
            icon={<OrderedListOutlined />}
          />

          <Dropdown overlay={tableMenus} trigger={["click"]}>
            <Button icon={<TableOutlined />} />
          </Dropdown>

          <Popover
            content={importLink}
            trigger="click"
            onVisibleChange={() => setLink("")}
          >
            <Button
              type={editor.isActive("link") ? "primary" : "default"}
              icon={<LinkOutlined />}
              title="Link"
            />
          </Popover>

          <Button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            type={editor.isActive("codeBlock") ? "primary" : "default"}
            icon={<CodeOutlined />}
            title="Code"
          />
          <Button
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            icon={<ClearOutlined />}
            title="Thanh tẩy"
          />
          <Button
            onClick={() => editor.chain().focus().setHardBreak().run()}
            icon={<EnterOutlined />}
            title="Xuống dòng"
          />
          <Button
            onClick={() => editor.chain().focus().undo().run()}
            icon={<UndoOutlined />}
            title="Hoàn tác"
          />
          <Button
            onClick={() => editor.chain().focus().redo().run()}
            icon={<RedoOutlined />}
            title="Làm lại"
          />
        </Col>
      </Row>
    </div>
  );
};

const TextEditor: FC<Props> = ({
  onChange,
  editable = true,
  value,
  defaultValue,
  readingMode = false,
}: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      // Default TableCell
      // TableCell,
      // Custom TableCell with backgroundColor attribute
      CustomTableCell,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Underline,
      Link,
    ],
    editable: editable && !readingMode ? true : false,
    content: value
      ? value.toString() !== "<p></p>"
        ? value.toString()
        : undefined
      : defaultValue
      ? defaultValue.toString()
      : undefined,
  });

  function handleChange() {
    let content = editor?.getHTML();
    if (content === "<p></p>") {
      content = undefined;
    }
    onChange(content);
  }

  return (
    <div className={`text-editor ${readingMode ? "reading-mode" : ""}`}>
      {!editable && <div className="disable-zone" />}

      {!readingMode && <MenuBar editor={editor} />}
      <EditorContent
        className="text-editor-content"
        editor={editor}
        onBlur={handleChange}
      />
    </div>
  );
};

export default TextEditor;
