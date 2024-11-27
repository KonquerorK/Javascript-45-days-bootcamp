import javax.swing.*;
import java.awt.datatransfer.*;
import java.awt.dnd.*;

public class DragAndDropDemo extends JFrame {
    public DragAndDropDemo() {
        setTitle("Java Swing Drag and Drop Demo");
        setSize(400, 300);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        
        JLabel label = new JLabel("Glisse et dépose ici !");
        label.setHorizontalAlignment(SwingConstants.CENTER);
        label.setTransferHandler(new TransferHandler("text"));
        
        // Détecte le drag and drop
        label.setDropTarget(new DropTarget() {
            public synchronized void drop(DropTargetDropEvent evt) {
                try {
                    evt.acceptDrop(DnDConstants.ACTION_COPY);
                    String droppedText = (String) evt.getTransferable().getTransferData(DataFlavor.stringFlavor);
                    label.setText(droppedText);
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        });

        add(label);
        setVisible(true);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new DragAndDropDemo());
    }
}
